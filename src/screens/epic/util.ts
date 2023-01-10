import { useProjectIdInUrl } from "screens/kanban/util"

export const useEpicSearchParams = () => ({projectId:useProjectIdInUrl().id})
export const useEpicsQueryKey = () => ['epics',useEpicSearchParams()]