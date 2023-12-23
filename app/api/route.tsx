import "server-only";
import { Employee, User } from "@/app/lib/definitions";

export async function login(email: string, password: string) {
  const data = { userName: email, password: password };
  const res = await fetch(`${process.env.ROOT_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const response = await res.json();

  return response.data as User;
}

export async function fetchFilteredEmployee(
  query: string,
  page: number,
  limit: number
) {
  const token = `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJuZ3V5ZW4uYW5oLXRhaTFAaGRzYWlzb24uY29tLnZuIiwiZ3JvdXAiOiJURUFDSEVSIiwiaWF0IjoxNzAzMjkxMDg5LCJleHAiOjE3MDMyOTY0ODl9.BMnaFId9OCxfwtqZ4ilTCBAp9z3Jl3takjOc_WN2dO18iGPo37behjqTjchPbJQAr_2GAu-lMyxG07-qZ-Ggaw`;
  const res = await fetch(
    `${process.env.ROOT_URL}/system/employee?query=${query}&page=${page}&limit=${limit}`,
    {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: token,
      }),
    }
  );
  const response = await res.json();
  console.log("Response: ", response);

  return response.data as Employee[];
}
