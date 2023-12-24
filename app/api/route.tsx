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
  const token = `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJuZ3V5ZW4uYW5oLXRhaTFAaGRzYWlzb24uY29tLnZuIiwiZ3JvdXAiOiJURUFDSEVSIiwiaWF0IjoxNzAzMzIxMzY3LCJleHAiOjE3MDMzMjY3Njd9.ow5zJm7PwA_5YGGmHM6eS_KPez-hQV8SXuCArmoWKsDRCsU21xwSwMd5lTeXsGc9ACcCPQIthPWhTbrHiTMZ4Q`;
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

  return response.data as Employee[];
}
