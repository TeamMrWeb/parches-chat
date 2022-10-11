"""
    This script generates the database documentation for the API.
    It uses pymongo to get the schema and then generates the documentation using the schema.

    Note: Supports all versions of Parches Chat API.

    Docstring format: reStructuredText
    Copyright (c) 2022 TeamParches
"""

try:
    import pymongo
except ImportError:
    print("Please install pymongo to run this script.")
    exit(1)

import os
import sys
import argparse


DEFAULT_MONGO_URL = 'mongodb://localhost:27017'
DEFAULT_OUTPUT_DIRECTORY = '../database'
DEFAULT_DATABASE = 'parches-chat'


def define_arguments() -> argparse.ArgumentParser:
    """
        Define the arguments for the script.
        Params:
            None
        Returns:
            argparse.ArgumentParser: The argument parser.
    """
    parser = argparse.ArgumentParser(
        description='Generate the database documentation for the API.')
    parser.add_argument('-o', '--output', type=str, default=DEFAULT_OUTPUT_DIRECTORY,
                        help='The output directory for the documentation.')
    parser.add_argument('-u', '--url', type=str, default=DEFAULT_MONGO_URL,
                        help='The URL of the mongo database.')
    parser.add_argument('-d', '--database', type=str, default=DEFAULT_DATABASE,
                        help='The name of the database.')
    return parser


def connect_client(url: str) -> pymongo.MongoClient:
    """
        Connect to the mongo database.
        Params:
            url: The URL of the mongo database.
        Returns:
            The mongo client.
    """
    try:
        client = pymongo.MongoClient(
            mongo_url, serverSelectionTimeoutMS=10, connectTimeoutMS=10000)
        client.server_info()
        return client
    except pymongo.errors.ServerSelectionTimeoutError:
        print('Could not connect to the database.')
        exit(1)


def exist_directory(directory: str) -> bool:
    """
        Check if a directory exists.
        Params:
            directory: The directory to check.
        Returns:
            bool: True if the directory exists, False otherwise.
    """
    return os.path.isdir(directory)


def create_directory(directory: str) -> None:
    """
        Create a directory.
        Params:
            directory: The directory to create.
        Returns:
            None
    """
    try:
        os.mkdir(directory)
    except OSError:
        print('Could not create the directory.')
        exit(1)


def get_database_schemas(database: pymongo.database.Database) -> dict():
    """
        Get the schemas of the database.
        Params:
            database: The database to get the schemas from.
        Returns:
            The schemas of the database as a dictionary.
    """
    schema = {}
    collections = database.list_collection_names()
    for collection in collections:
        schema_object = database[collection].find_one()
        if schema_object:
            schema[collection] = schema_object
    return schema


def get_datatype(value: any) -> str:
    """
        Get the datatype of a value.
        Params:
            value: The value to get the datatype from.
        Returns:
            The datatype of the value.
    """
    pymongo_datatypes = {
        'ObjectId': 'ObjectId',
        'str': 'String',
        'int': 'Int',
        'float': 'Float',
        'bool': 'Boolean',
        'datetime': 'Datetime',
        'list': 'Array of ObjectIds',
        'dict': 'Object'
    }
    return pymongo_datatypes.get(type(value).__name__, 'Unknown')


def generate_markdown(schemas: dict()) -> dict():
    """
        Generate the markdown documentation from the schema.
        Params:
            schema: The schema to generate the documentation from.
        Returns:
            The markdown documentation as a dictionary.
    """
    markdown = {}

    for collection in schemas:
        markdown[collection] = f'# {collection}\n\n This collection contains the following fields\n\n'
        markdown[collection] += ' | Field | Type | Description |\n | ----- | ---- | ----------- |\n'

        for field in schemas[collection]:
            if field == '_id':
                continue
            datatype = get_datatype(schemas[collection][field])
            markdown[collection] += f'| {field} | {datatype} |  |\n'

    return markdown


if __name__ == '__main__':
    parser = define_arguments()
    args = parser.parse_args(sys.argv[1:])

    # Get the arguments
    output_directory = args.output
    mongo_url = args.url
    database_name = args.database

    if not database_name:
        print('Please specify a database name.')
        exit(1)

    # Check if the output directory exists
    if not exist_directory(output_directory):
        print('The output directory does not exist. Creating it ..')
        create_directory(output_directory)

    # Connect to the database
    client = connect_client(mongo_url)
    print(f'Connected to mongo ({mongo_url}) successfully.')

    # Get schema for each collection in the database
    database = client[database_name]
    schemas = get_database_schemas(database)

    # Generate the markdown documentation
    markdown = generate_markdown(schemas)

    # Write the markdown documentation to a file
    print('Writing the documentation ..')
    for collection in markdown:
        filename = f'{output_directory}/{collection}.md'
        with open(filename, 'w') as file:
            file.write(markdown[collection])

    print('Done.')
    client.close()
    print('Closed the client successfully.')
    os.system('pause')
