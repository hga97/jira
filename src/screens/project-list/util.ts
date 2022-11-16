import { useMemo } from "react";
import { useProject } from "utils/project";
import { useUrlQueryParam } from "utils/url";
import { useSearchParams } from "react-router-dom";

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

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]); // 新增

  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
    "editingProjectId",
  ]); // 编辑

  const [_, setUrlParams] = useSearchParams();

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
    projectCreate: projectCreate === "true" || Boolean(editingProjectId),
    open,
    close,
    startEdit,
    editingProject,
    isLoading,
  };
};
