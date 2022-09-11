# This file exports all schemas using the package get-graphql-schema

import os
import subprocess
from requests import get

# note: graphiql should be disabled
GRAPHQL_ENDPOINT = 'http://localhost:4000/graphql'
OUTPUT_FOLDER = './addons'
FILENAME = 'schemas.graphql'
PACKAGE = 'get-graphql-schema@2.1.2'


def checkOutput(command: str) -> bool:
    try:
        subprocess.check_output(command, shell=True)
        return True
    except subprocess.CalledProcessError:
        return False


def isNPMPackageInstalled(package: str) -> bool:
    return checkOutput(f'npm list -g {package}')


def existPath(path: str) -> bool:
    return os.path.exists(path)


def checkEndpoint(endpoint: str) -> bool:
    try:
        get(endpoint)
        return True
    except:
        return False


if __name__ == '__main__':
    if not isNPMPackageInstalled(PACKAGE):
        print(f'''
            Not found {PACKAGE}. Please install it.
            > npm install -g {PACKAGE}
        ''')
        exit(1)
    print(f'{PACKAGE} found.')

    if not existPath(OUTPUT_FOLDER):
        os.mkdir(OUTPUT_FOLDER)
        print(f'{OUTPUT_FOLDER} created')

    print(f'Checking graphql endpoint ({GRAPHQL_ENDPOINT})')
    if not checkEndpoint(GRAPHQL_ENDPOINT):
        print(f'''
            Request to {GRAPHQL_ENDPOINT} failed.
            Please check your graphql endpoint.
        ''')
        exit(1)

    print('Connection successful.')
    print(f'Exporting schemas to {OUTPUT_FOLDER}/{FILENAME}')

    command = f'get-graphql-schema {GRAPHQL_ENDPOINT} > {OUTPUT_FOLDER}/{FILENAME}'
    print(f'Running command: {command}')
    if checkOutput(command):
        print('Export successful.')
    else:
        print('Export failed.')
        exit(1)
