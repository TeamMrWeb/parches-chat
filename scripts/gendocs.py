"""
    This script generates the GraphQL documentation for the API.
    It uses the introspection query to get the schema and then
    generates the documentation using the schema.

    Note: Only supports Parches Chat GraphQL Schema v0.0.9 and below.

    Docstring format: reStructuredText
    Copyright (c) 2022 TeamParches
"""

import requests
import markdown
import os

# The URL of the GraphQL endpoint
GRAPHQL_URL = 'http://localhost:4000/graphql'

# Ouput directory for the documentation
OUTPUT_DIRECTORY = '../docs'

INSTROSPECTION_QUERY = """
        query IntrospectionQuery {
            __schema {
                TARGET_INSTROSPECTION {
                    name
                    description
                    fields {
                        name
                        description
                        args {
                            name
                            description
                        }
                    }
                }
            }
        }
    """


def generate_markdown(instrospection: dict, filename: str) -> str:
    """
        Generates the markdown documentation from the instrospection.
        Params:
            instrospection: The instrospection to generate the documentation.
            filename: The filename to save the documentation.
        Returns:
            The markdown documentation as a string.
    """
    markdown = ""
    for field in instrospection:
        markdown += f"## {field['name']}\n"
        markdown += f"{field['description']}\n"
        markdown += '### Arguments\n' if field['args'] else ''
        for arg in field['args']:
            markdown += f"- {arg['name']}\n"
            markdown += f"> {arg['description']}\n" if arg['description'] else ""
    return markdown


def get_instrospection(url: str, query: str) -> dict:
    """
        Gets the instrospection from the GraphQL endpoint.
        Params:
            query: The query to get the instrospection.
        Returns:
            The instrospection as a dictionary.
    """
    try:
        response = requests.post(url, json={'query': query})
        response.raise_for_status()
    except requests.exceptions.HTTPError as err:
        raise SystemExit(err)
    # excludes data and __schema keys
    return response.json()['data']['__schema']


def generate_query(instrospection_query: str, target: str) -> str:
    """
        Generates the query for the introspection query.
        Params:
            instrospection_query: The instrospection query.
            target: The target to get the instrospection from.
        Returns:
            The query for the introspection query.
    """
    return instrospection_query.replace('TARGET_INSTROSPECTION', target)


def save_file(filename: str, content: str) -> None:
    """
        Saves the content to the file.
        Params:
            filename: The filename to save the content.
            content: The content to save.
        Returns:
            None
    """
    with open(filename, 'w') as file:
        file.write(content)


def generate_directory(directory: str) -> None:
    """
        Generates the directory to save the documentation.
        Params:
            directory: The directory to generate.
        Returns:
            None
    """
    try:
        os.mkdir(directory)
    except FileExistsError:
        pass


if __name__ == '__main__':

    targets = ['queryType', 'mutationType']

    for target in targets:

        print(f'> Generating documentation for {target} ..')
        query = generate_query(
            INSTROSPECTION_QUERY, target)

        print('> Getting instrospection ..')
        instrospection = get_instrospection(GRAPHQL_URL, query)
        # excludes name and description keys
        instrospection = instrospection[target]['fields']

        print('> Generating markdown ..')
        markdown = generate_markdown(instrospection, f'{target}.md')

        print('> Saving markdown ..')

        filename = f'{OUTPUT_DIRECTORY}/{target}.md'
        try:
            save_file(filename, markdown)
        except FileNotFoundError as err:
            generate_directory(OUTPUT_DIRECTORY)
            save_file(filename, markdown)

        print('Done!')
