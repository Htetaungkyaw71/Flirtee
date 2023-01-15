export default getMatch = (users,userLogged)=>{
    const newUsers = {...users}
    delete newUsers[userLogged]

    const [id,user] = Object.entries(newUsers).flat();

    return {id,...user}
}