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

import argparse

DEFAULT_MONGO_URL = 'mongodb://localhost:27017'
DEFAULT_OUTPUT_DIRECTORY = 'database'
DEFAULT_DATABASE = 'parches-chat'

if __name__ == '__main__':
    parser = argparse.ArgumentParser(
        description='Generate database documentation for the Parches Chat API.')

    parser.add_argument('-o', '--output', type=str, default=DEFAULT_OUTPUT_DIRECTORY,
                        help='The output directory for the documentation.')

    parser.add_argument('-u', '--url', type=str, default=DEFAULT_MONGO_URL,
                        help='The URL of the database.')

    parser.add_argument('-d', '--database', type=str, default=DEFAULT_DATABASE,
                        help='The name of the database.')

    args = parser.parse_args()
    
