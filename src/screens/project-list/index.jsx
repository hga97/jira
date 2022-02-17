import React, { useState, useEffect } from "react";
import qs from "qs";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { cleanObject } from "../../utils/index";
const url = process.env.REACT_APP_API_URL;

export const ProjectList = () => {
  const [params, setParams] = useState({
    name: "",
    personId: "",
  });

  const [userList, setUserList] = useState([]);
  const [projectsList, setProjectsList] = useState([]);

  useEffect(() => {
    fetch(`${url}/users`)
      .then(async (res) => {
        if (res.status === 200) {
          setUserList(await res.json());
        }
      })
      .catch();
  }, []);

  useEffect(() => {
    const result = cleanObject(params);
    fetch(
      `${url}/projects?${qs.stringify(result)}`
    ).then(async (res) => {
      if (res.status === 200) {
        setProjectsList(await res.json());
      }
    });
  }, [params]);

  return (
    <div>
      <SearchPanel params={params} setParams={setParams} list={userList} />
      <List projectsList={projectsList} userList={userList} />
    </div>
  );
};
