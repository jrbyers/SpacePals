from flask import Flask, request, jsonify, make_response
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


@app.route("/", methods=["POST", "OPTIONS"])
def graphql_server():
    if request.method == "OPTIONS": # CORS preflight
        return _build_cors_preflight_response()
    data = request.get_json()

    success, result = graphql_sync(
        schema,
        data,
        context_value=request,
        debug=app.debug
    )

    status_code = 200 if success else 400
    return _corsify_actual_response(jsonify(result)), status_code

def _corsify_actual_response(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

def _build_cors_preflight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response



if __name__ == '__main__':
    port = int(os.environ.get('PORT', 80))
    app.run(host ='0.0.0.0', port=port)
