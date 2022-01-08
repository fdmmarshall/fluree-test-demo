import { ip, network, database } from "./../appConfig";
import { useState, useEffect } from "react";

export default function DinoTable() {
  const [dinos, setDinos] = useState([]);

  console.log(dinos);

  const axios = require("axios");

  const baseURL = `${ip}/fdb/${network}/${database}/`;

  const dinoQuery = {
    select: [
      "dinosaurName",
      "englishTranslation",
      "link",
      {
        dinoType: ["species", "diet"],
      },
    ],
    from: "dinos",
    opts: {
      compact: true,
      limit: 50,
    },
  };

  const getDinos = async () => {
    const response = await axios.post(`${baseURL}query`, dinoQuery);
    console.log(response.data);
    setDinos(response.data);
  };

  useEffect(() => {
    getDinos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  let assignDietColor = (diet) => {
    if (diet === "herbivorous") {
      return "bg-green-100 text-green-800";
    } else if (diet === "carnivorous") {
      return "bg-red-100 text-red-800";
    } else {
      return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Dinosaur Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Species
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Diet
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Link
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dinos.map((dino, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {dino.dinosaurName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {dino.englishTranslation}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {dino.dinoType.species}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={classNames(
                          assignDietColor(dino.dinoType.diet) +
                            " px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                        )}
                      >
                        {dino.dinoType.diet}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <a href={dino.link}>{dino.dinosaurName}</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
