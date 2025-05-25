"use client";
import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";

interface TableData {
  id: string;
  name: string;
  type: string;
}

const typeOptions = [
  { value: "personal", label: "Personal" },
  { value: "business", label: "Business" },
  { value: "organization", label: "Organization" },
  { value: "educational", label: "Educational" },
  { value: "government", label: "Government" },
];

// Sample data for demonstration
const sampleData: TableData[] = [
  { id: "1", name: "John Doe", type: "personal" },
  { id: "2", name: "Acme Corp", type: "business" },
  { id: "3", name: "Harvard University", type: "educational" },
  { id: "4", name: "City Council", type: "government" },
  { id: "5", name: "Red Cross", type: "organization" },
];

export default async function TablePage({ accounts }) {
  const [tableData, setTableData] = useState<TableData[]>(sampleData);
  const [message, setMessage] = useState<string | null>(null);

  const handleEdit = (item: TableData) => {
    setMessage(`Edit clicked for: ${item.name}`);
    // Here you would typically open an edit form or modal
    console.log("Edit item:", item);
  };

  const handleDelete = (id: string) => {
    const itemToDelete = tableData.find((item) => item.id === id);
    setTableData((prev) => prev.filter((item) => item.id !== id));
    setMessage(`Deleted: ${itemToDelete?.name}`);

    // Clear message after 3 seconds
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Table Section */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200">
          <div className="p-6 pb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Profiles Table
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {accounts.length === 0
                ? "No profiles available."
                : `${accounts.length} profile(s) found.`}
            </p>
          </div>

          {/* Message */}
          {message && (
            <div className="mx-6 mb-4">
              <div className="p-3 rounded-md text-sm border bg-green-50 text-green-700 border-green-200">
                {message}
              </div>
            </div>
          )}

          {accounts.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-t border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {accounts.map((item, index) => (
                    <tr
                      key={item.id}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {typeOptions.find(
                            (option) => option.value === item.type
                          )?.label || item.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {accounts.length === 0 && (
            <div className="p-6 text-center">
              <div className="text-gray-400 text-sm">
                <p>No data to display.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
