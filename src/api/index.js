import  {post,get} from "../config/axios"

export const createProject = async (data)=> await post('/api/createNewDemand',data)

export const getProjectList = async (data)=> await get('/api/getProjectList',data)

export const getDemandList = async (data)=> await post('/api/getDemandList',data)