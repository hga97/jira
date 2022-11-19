import { useMemo } from "react";
import { useProject } from "utils/project";
import { useSetUrlSearchParam, useUrlQueryParam } from "utils/url";

export const useProjectsSearchParams = () => {
  const [params, setParams] = useUrlQueryParam(["name", "personId"]);
  return [
    useMemo(
      () => ({
        ...params,
        personId: Number(params.personId) || undefined,
      }),
      [params]
    ),
    setParams,
  ] as const;
};

export const useProjectsQueryKey = () => {
  const [params] = useProjectsSearchParams();
  return ["projects", params];
};

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]); // 新增

  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
    "editingProjectId",
  ]); // 编辑

  const setUrlParams = useSetUrlSearchParam();

  const { data: editingProject, isLoading } = useProject(
    Number(editingProjectId)
  ); // 获取编辑的project

  const open = () => setProjectCreate({ projectCreate: true });
  const close = () => {
    setUrlParams({ projectCreate: "", editingProjectId: "" });
  };
  const startEdit = (id: number) =>
    setEditingProjectId({ editingProjectId: id });

  return {
    projectModalOpen: projectCreate === "true" || Boolean(editingProjectId),
    open,
    close,
    startEdit,
    editingProject,
    isLoading,
  };
};
