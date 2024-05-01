export default (error:string[]|null|undefined) => {
    return error && error[0];
}