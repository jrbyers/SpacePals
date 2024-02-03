from ariadne import QueryType, MutationType
import logic

query = QueryType()
mutation = MutationType()

@query.field("hello")
def resolve_hello(_, info):
    number = logic.giveRandom()
    return "Hi there " + str(number)

@query.field("foundAnimals")
def resolve_foundAnimals(_, info):
    #number = logic.giveRandom()
    return ["deer", "monkeeee"]



@mutation.field("sendImage")
def sendImage(_, info, image):
   yo = image + "YO"
   return yo