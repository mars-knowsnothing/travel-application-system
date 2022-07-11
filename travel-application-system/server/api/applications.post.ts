export default defineEventHandler(async (event) => {
    const body = await useBody(event)
    const {data:resp} = useFetch("http://localhost:8888/applications",{method:"post",body:body})
    return { resp }
})