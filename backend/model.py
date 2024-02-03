from ariadne import QueryType
import logic

query = QueryType()

@query.field("hello")
def resolve_hello(_, info):
    number = logic.giveRandom()
    return "Hi there " + str(number)