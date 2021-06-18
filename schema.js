const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GrapQLNonNull
} = require('graphql'); 

//Data is hard coded
const customers = [
    {id:'1111', name:'Naga1', email:'nagaraju101@gmail.com', age:38}, 
    {id:'1112', name:'Naga2', email:'nagaraju102@gmail.com', age:39},
    {id:'1113', name:'Naga3', email:'nagaraju103@gmail.com', age:40},
    {id:'1114', name:'Naga4', email:'nagaraju104@gmail.com', age:41},
]; 


//Customer Type
const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields:() => ({
        id:{type:GraphQLString},
        name: {type: GraphQLString },
        email:{type:GraphQLString},
        age: {type: GraphQLInt }

    })
}); 

// Root Query single customer
const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        Customer:{
            type: CustomerType,
            args:{
                id:{type:GraphQLString}
            },
            resolve(parentValue, args){
                for(let i = 0; i < customers.length; i++){
                    if(customers[i].id == args.id){
                        return customers[i]; 
                    }
                }
            }
        }, 

        Customers:{
            type: new GraphQLList(CustomerType),
            resolve(parentValue, args) {
                    return customers; 
            }
        }

    }   
}); 


module.exports = new GraphQLSchema({
    query: RootQuery
}); 