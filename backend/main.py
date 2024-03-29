from flask import Flask, request, jsonify
from ariadne import graphql_sync, make_executable_schema, gql, load_schema_from_path
from ariadne.explorer import ExplorerGraphiQL
import os


explorer_html = ExplorerGraphiQL().html(None)

# The model is where we'll define our resolvers
from model import query, mutation

# We'll create this schema soon
type_defs = gql(load_schema_from_path("./schema.graphql"))
schema = make_executable_schema(type_defs, query, mutation)

app = Flask(__name__)

# List of T/F
bool_list = [False] * 50

file_path = 'bool.txt'
with open(file_path, 'w') as file:
    file.write('\n'.join(map(str, map(int, bool_list))))

@app.route("/", methods=["GET"])
def graphql_playground():
    """Serve GraphiQL playground"""
    return explorer_html, 200


@app.route("/", methods=["POST"])
def graphql_server():
    data = request.get_json()

    success, result = graphql_sync(
        schema,
        data,
        context_value=request,
        debug=app.debug
    )

    status_code = 200 if success else 400
    return jsonify(result), status_code


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 80))
    app.run(host ='0.0.0.0', port=port)