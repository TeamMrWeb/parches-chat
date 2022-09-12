"""
    This script generates the GraphQL documentation for the API.
    It uses the introspection query to get the schema and then
    generates the documentation using the schema.

    Note: Only supports Parches Chat GraphQL Schema v0.1.0 and below.

    Docstring format: reStructuredText
    Copyright (c) 2022 TeamParches
"""

import os
import requests
import markdown
import random

# The URL of the GraphQL endpoint
GRAPHQL_URL = 'http://localhost:4000/graphql'

# Ouput directory for the documentation
OUTPUT_DIRECTORY = 'docs'

INSTROSPECTION_QUERY = """
        query IntrospectionQuery {
            __schema {
                TARGET_INSTROSPECTION {
                    name
                    description
                    fields {
                        name
                        description
                        isDeprecated
                        deprecationReason
                        args {
                            name
                            description
                            type {
                                name
                                kind
                                ofType {
                                    name
                                    ofType {
                                        name
                                    }
                                }
                            }
                        }
                        type {
                            name
                            kind
                            ofType {
                                name
                                description
                                kind
                            }
                        }
                    }
                }
            }
        }
    """

TYPES_EXAMPLE = {
    'String': '"test"',
    'Int': random.randint(0, 4),
    'Float': '1.0',
    'Boolean': bool(random.getrandbits(1)),
    'ID': f'"{"".join(random.choices("0123456789abcdef", k=24))}"'
}


def parse_field(field: dict, include_return: bool, type: str) -> str:
    """
        Parses the instrospection fields to markdown format.
        Params:
            instrospection: The instrospection to parse.
            include_return: Whether to include the return type.
            type: The type object that uses the field.
        Returns:
            The parsed instrospection as markdown.
    """

    markdown = f"## > {field['name']}\n\n"
    markdown += f"{field['description']}\n\n"

    # if the field is deprecated
    if field['isDeprecated']:
        markdown += f"**Deprecated:** {field['deprecationReason']}\n\n"

    example = '#### Example usage\n\n'
    example += f"```graphql example\n{type} example <\n"
    example += f"\t{field['name']}"

    # Arguments
    if field['args']:
        markdown += "#### Arguments\n\n"
        example += '(\n'
        for arg in field['args']:

            example += f'\t\t{arg["name"]}: '
            markdown += f"- `{arg['name']}`"

            nonull = arg['type']['kind'] == 'NON_NULL'
            islist = arg['type']['kind'] == 'LIST'
            argtype = arg['type']['ofType']['name'] if not arg['type']['name'] else arg['type']['name']

            # no null and list but instrospection query cant get its
            # TODO: fix that in the API
            if argtype is None:
                islist = True
                argtype = arg['type']['ofType']['ofType']['name']

            example += f"{TYPES_EXAMPLE[argtype]}\n" if not islist else f"[{TYPES_EXAMPLE[argtype]}, {TYPES_EXAMPLE[argtype]}]\n"
            markdown += f" _{argtype}_" if not islist else f" _[{argtype}]_"

            if nonull:
                markdown += "**!**"

            markdown += '\n'
            markdown += f"   - {arg['description'] if arg['description'] else 'No description provided.'}\n\n"
        example += '\t)\n'

    # Returns
    if include_return:

        rettype = field['type']['name'] if not field['type']['ofType'] else field['type']['ofType']['name']
        islist = field['type']['kind'] == 'LIST'

        example += '' if rettype == 'String' else '\t<\n\t\t# add fields here (depends on the return type)\n\t>'

        markdown += '> Returns'
        markdown += f" **_{rettype}_**" if not islist else f" _[**{rettype}**]_"
        markdown += '\n\n'

    # parses brackets

    example += '\n>\n```\n\n'
    example = example.replace('<', '{').replace('>', '}')
    markdown += example

    return markdown


def generate_markdown(instrospection: dict, filename: str) -> str:
    """
        Generates the markdown documentation from the instrospection.
        Not supports Types.
        Params:
            instrospection: The instrospection to generate the documentation.
            filename: The filename to save the documentation.
        Returns:
            The markdown documentation as a string.
    """

    markdown = f"# {instrospection[filename]['name']}\n\n"
    markdown += f"{instrospection[filename]['description']}\n\n"

    instrospection = instrospection[filename]['fields']

    for field in instrospection:
        markdown += parse_field(field, include_return=True,
                                type=filename.replace('Type', ''))

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

    print(f'Checking connection to {GRAPHQL_URL}...')
    try:
        response = requests.get(GRAPHQL_URL)
    except Exception as err:
        raise SystemExit('Cannot connect to the GraphQL endpoint.')

    for target in targets:

        print(f'> Generating docs for {target} ..')
        query = generate_query(
            INSTROSPECTION_QUERY, target)
        instrospection = get_instrospection(GRAPHQL_URL, query)
        markdown = generate_markdown(instrospection, target)
        filename = f'{OUTPUT_DIRECTORY}/{target}.md'
        try:
            save_file(filename, markdown)
        except FileNotFoundError as err:
            generate_directory(OUTPUT_DIRECTORY)
            save_file(filename, markdown)
        print(f'- Docs for {target} generated successfully')

    print('Documentation done!')
