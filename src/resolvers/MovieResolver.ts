import { Movie } from "../entity/Movie";
import { Arg, Field, InputType, Int, Mutation, Query, Resolver } from "type-graphql";

@InputType()
class MovieIntput {
    @Field()
    title: string;

    @Field(() => Int)
    minutes: number;
}

// if you want an input to work differently
// i.e. you want a field with nullable: true
// create anoter / separate InputType
//  gql does not like 'null' as a dataype so it (gql) uses undefined.
// And gql will be truly happy with you if you do so.
// undefined datatype in graphql is '?',
// and is placed beside the key of the field

/**
 * NOTE!
 * 1. resolvers can be identified as (at least for this project): 
 * ---- Query, and
 * ---- Mutation
 * 
 * 2. ON CREATING RESOLVERS (Flow):
 * ---- a. create resolver with either Query or Mutation
 * ---- b. satisfy value of resolver, can be Boolean or can be your own created module
 * ---- c. set arguments for your resolver
 * ---- d. put your database logic
 * ---- e. Side Note (for research): 
 * ---------- + does functions always have to be async? or can it be just simple function?
 * ---------- + gql resolver functions can take on multiple arguments depending on your need. -- wouldn't this take on too much run time if there are plently of arguments in a single resolver? or does the number of arguments affect runtime?
 * 
 * VISUAL STRUCTURE:
 * ```
 * @ResolverType(() => resolver value)
 * function name(
 *      @Arg("argument1_key", inputType) argument1_key: inputType,
 *      @Arg("argument2_key", inputType) argument2_key: inputType
 * ) {
 *      database logic here
 * }
 * ```
 */


@InputType()
class MovieUpdateInput {
    @Field(() => String, { nullable: true })
    title?: string;

    @Field(() => Int, { nullable: true })
    minutes?: number;
}

@Resolver()
export class MovieResolver {
    // tells graphql what the mutation value is
    @Mutation(() => Movie)
    async createMovie(
        @Arg("options", () => MovieIntput) options: MovieIntput
    ) {
        // console.log(options);
        const movie = await Movie.create(options).save();
        return movie;
    }

    @Mutation(() => Boolean)
    async updateMovie(
        @Arg("id", () => Int) id: number,
        @Arg("updatedInput", () => MovieUpdateInput) updatedInput: MovieUpdateInput
    ) {
        await Movie.update({ id }, updatedInput)
        return true;
    }

    @Mutation(() => Boolean)
    async deleteMovie(@Arg("id", () => Int) id: number) {
        // this part is where the db logic comes in
        // criteria = you will have to pass in a criteria in this area what attribute in the db you want to be deleted
        // .delete({ <criteria> })
        await Movie.delete({id});
        return true;
    }

    @Query(() => [Movie])
    movies() {
        return Movie.find();
    }
}
