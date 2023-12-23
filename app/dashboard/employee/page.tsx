import { beVietnamPro } from "@/app/ui/fonts";
import Search from "@/app/ui/search";
import { Suspense } from "react";
import { CreateEmployee } from "@/app/ui/employee/buttons";
import Pagination from "@/app/ui/employee/pagination";
import Image from "next/image";
import { UpdateEmployee, DeleteEmployee } from "@/app/ui/employee/buttons";
import { fetchFilteredEmployee } from "@/app/api/route";
import clsx from "clsx";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    limit?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 6;
  const employees = await fetchFilteredEmployee(query, currentPage, limit);
  console.log("employees", employees);
  const totalPages = employees.length / limit;

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${beVietnamPro.className} text-2xl`}>Employee</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search emloyee..." />
        <CreateEmployee />
      </div>
      <div className="mt-5 flex w-full justify-center">
        {/* <Suspense
          fallback={<InvoicesTableSkeleton />}
          key={query + currentPage}
        > */}
        <div className="mt-6 flow-root">
          <div className="inline-block min-w-full align-middle">
            <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
              <div className="md:hidden">
                {employees?.map((employee) => (
                  <div
                    key={employee.id}
                    className="mb-2 w-full rounded-md bg-white p-4"
                  >
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <div className="mb-2 flex items-center">
                          {/* <Image
                        src={employee.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${employee.fullName}'s profile picture`}
                      /> */}
                          <p>{employee.fullName}</p>
                        </div>
                        <p className="text-sm text-gray-500">
                          {employee.email}
                        </p>
                      </div>
                      <span
                        className={clsx(
                          "inline-flex items-center rounded-full px-2 py-1 text-xs",
                          {
                            "bg-gray-100 text-gray-500": status === "pending",
                            "bg-green-500 text-white": status === "paid",
                          }
                        )}
                      >
                        {employee.deleted ? (
                          <>
                            Pending
                            <ExclamationCircleIcon className="ml-1 w-4 text-gray-500" />
                          </>
                        ) : null}
                        {!employee.deleted ? (
                          <>
                            Paid
                            <CheckCircleIcon className="ml-1 w-4 text-white" />
                          </>
                        ) : null}
                      </span>
                    </div>
                    <div className="flex w-full items-center justify-between pt-4">
                      {/* <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(employee.amount)}
                    </p>
                    <p>{formatDateToLocal(employee.date)}</p>
                  </div> */}
                      <div className="flex justify-end gap-2">
                        <UpdateEmployee id={employee.id} />
                        <DeleteEmployee id={employee.id} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <table className="hidden min-w-full text-gray-900 md:table">
                <thead className="rounded-lg text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Customer
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Email
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Amount
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Date
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Status
                    </th>
                    <th scope="col" className="relative py-3 pl-6 pr-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {employees?.map((employee) => (
                    <tr
                      key={employee.id}
                      className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                    >
                      <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex items-center gap-3">
                          {/* <Image
                        src={employee.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${employee.fullName}'s profile picture`}
                      /> */}
                          <p>{employee.fullName}</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        {employee.email}
                      </td>
                      {/* <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(employee.amount)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(employee.date)}
                  </td> */}
                      <td className="whitespace-nowrap px-3 py-3">
                        <span
                          className={clsx(
                            "inline-flex items-center rounded-full px-2 py-1 text-xs",
                            {
                              "bg-gray-100 text-gray-500": status === "pending",
                              "bg-green-500 text-white": status === "paid",
                            }
                          )}
                        >
                          {employee.deleted ? (
                            <>
                              Disable
                              <ExclamationCircleIcon className="ml-1 w-4 text-gray-500" />
                            </>
                          ) : null}
                          {!employee.deleted ? (
                            <>
                              Active
                              <CheckCircleIcon className="ml-1 w-4 text-white" />
                            </>
                          ) : null}
                        </span>
                      </td>
                      <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex justify-end gap-3">
                          <UpdateEmployee id={employee.id} />
                          <DeleteEmployee id={employee.id} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* </Suspense> */}
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}
