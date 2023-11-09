export async function fetchRecipes (filter){
    const {query, limit} = filter;


    const url = `https://api.edamam.com/search?q=${query}&app_id=4218a5bf&app_key=2a1067fc08268ddb55aa13f77c428793&from=0&to=${limit}&`;


    const response = await fetch(url)

    const data = await response.json();
    console.log(data)

    return data?.hits;
}

export async function fetchRecipe(id){
    const url = `https://api.edamam.com/search?r=http://www.edamam.com/ontologies/edamam.owl%23${id}&app_id=4218a5bf&app_key=2a1067fc08268ddb55aa13f77c428793`
    
    const response = await fetch(url)
    
    const data = await response.json();
    
    return data[0];
    }