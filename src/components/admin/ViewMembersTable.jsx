import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useDatabaseContext } from "@/context/databaseContext";

const ViewMembersTable = ({clubMembers}) => {

 
 console.log('members in table:', clubMembers)

  return (
    <Card className="rounded shadow-sm border-b-2 border-border w-full max-w-full overflow-x-hidden">
      <CardContent className="px-0 pb-0 w-full max-w-full">
        <div className="w-full overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  First Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Last Name
                </th>
            
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Role
                </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Email
                </th>
              </tr>
            </thead>
            <tbody className="bg-background divide-y divide-border">
              {clubMembers.map((member) => (
                <tr key={member.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                    {member.firstName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                    {member.lastName}
                  </td>
            
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    {member.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    {member.role}
                  </td>
                        <td className="px-6 py-4 whitespace-normal break-words text-sm text-muted-foreground w-[50px] ">
                    {member.email}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ViewMembersTable;
