'use clients';
import React, { useState } from 'react';

interface Package {
  company: string;
  model: string;
  color: string;
  leftSN: string;
  rightSN: string;
  remote: string;
  charger: string;
}

export default function FilterBtn() {
  // const [packages, setPackages] = useState<Package[]>([]);
  const packages: Package[] = [
    {
      company: 'Oticon',
      model: 'Real2',
      color: 'Charcoal',
      leftSN: '2335N0R66',
      rightSN: '2344N2W2J',
      remote: '2337F440HN',
      charger: '2338NYCL6',
    },
    {
      company: 'AOticon',
      model: 'Real2',
      color: 'Charcoal',
      leftSN: '2335N0R66',
      rightSN: '2344N2W2J',
      remote: '2337F440HN',
      charger: '2338NYCL6',
    },
    {
      company: 'Oticon',
      model: 'Real2',
      color: 'Blue',
      leftSN: '2335N0R66',
      rightSN: '2344N2W2J',
      remote: '2337F440HN',
      charger: '1338NYCL6',
    },
    {
      company: 'Oticon',
      model: 'Real2',
      color: 'Charcoal',
      leftSN: '2335N0R66',
      rightSN: '2344N2W2J',
      remote: '2337F440HN',
      charger: '2338NYCL6',
    },
    {
      company: 'COticon',
      model: 'Real2',
      color: 'Charcoal',
      leftSN: '2335N0R66',
      rightSN: '1344N2W2J',
      remote: '2337F440HN',
      charger: '5338NYCL6',
    },
    {
      company: 'Oticon',
      model: 'Real2',
      color: 'Green',
      leftSN: '2335N0R66',
      rightSN: '2344N2W2J',
      remote: '1337F440HN',
      charger: '2338NYCL6',
    },
    {
      company: 'Oticon',
      model: 'Real2',
      color: 'Charcoal',
      leftSN: '1335N0R66',
      rightSN: '2344N2W2J',
      remote: '2337F440HN',
      charger: '2338NYCL6',
    },
    {
      company: 'BOticon',
      model: 'Real2',
      color: 'Charcoal',
      leftSN: '2335N0R66',
      rightSN: '2344N2W2J',
      remote: '2337F440HN',
      charger: '2338NYCL6',
    },
    {
      company: 'BOticon',
      model: 'Real2',
      color: 'Charcoal',
      leftSN: '2335N0R66',
      rightSN: '2344N2W2J',
      remote: '1337F440HN',
      charger: '2338NYCL6',
    },
  ];
  const [selectedCompanyFilterBoxes, setSelectedCompanyFilterBoxes] = useState<
    string[]
  >([]);
  const [selectedModelFilterBoxes, setSelectedModelFilterBoxes] = useState<
    string[]
  >([]);
  const [selectedColorFilterBoxes, setSelectedColorFilterBoxes] = useState<
    string[]
  >([]);
  const [selectedLeftSNFilterBoxes, setSelectedLeftSNFilterBoxes] = useState<
    string[]
  >([]);
  const [selectedRightSNFilterBoxes, setSelectedRightSNFilterBoxes] = useState<
    string[]
  >([]);
  const [selectedRemoteFilterBoxes, setSelectedRemoteFilterBoxes] = useState<
    string[]
  >([]);
  const [selectedChargerFilterBoxes, setSelectedChargerFilterBoxes] = useState<
    string[]
  >([]);

  const handleCompanyFilterBoxes = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSelectedCompanyFilterBoxes((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };
  const handleModelFilterBoxes = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSelectedModelFilterBoxes((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };
  const handleColorFilterBoxes = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSelectedColorFilterBoxes((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };
  const handleLeftSNFilterBoxes = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSelectedLeftSNFilterBoxes((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };
  const handleRightSNFilterBoxes = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSelectedRightSNFilterBoxes((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };
  const handleRemoteFilterBoxes = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSelectedRemoteFilterBoxes((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };
  const handleChargerFilterBoxes = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSelectedChargerFilterBoxes((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const uniqueCompany = Array.from(
    new Set(packages.map((eachPackage) => eachPackage.company)),
  );
  const uniqueModel = Array.from(
    new Set(packages.map((eachPackage) => eachPackage.model)),
  );
  const uniqueColor = Array.from(
    new Set(packages.map((eachPackage) => eachPackage.color)),
  );
  const uniqueLeftSN = Array.from(
    new Set(packages.map((eachPackage) => eachPackage.leftSN)),
  );
  const uniqueRightSN = Array.from(
    new Set(packages.map((eachPackage) => eachPackage.rightSN)),
  );
  const uniqueRemote = Array.from(
    new Set(packages.map((eachPackage) => eachPackage.remote)),
  );
  const uniqueCharger = Array.from(
    new Set(packages.map((eachPackage) => eachPackage.charger)),
  );

  return (
    <div className="flex items-center">
      <div className="text-xs ml-5 mr-2">Filter: </div>
      <div className="dropdown dropdown-hover">
        <div tabIndex={0} role="button" className="btn btn-xs m-1 px-7">
          filter
        </div>
        <ul
          tabIndex={0}
          className="menu dropdown-content z-[1] bg-base-100 shadow rounded-box "
        >
          <li>
            <div>
              <a className="w-20">Company</a>
              {uniqueCompany.map((name, index) => (
                <label key={index} className="flex w-36">
                  <input
                    type="checkbox"
                    value={name}
                    onChange={handleCompanyFilterBoxes}
                  />
                  <span className="ml-2">{name}</span>
                </label>
              ))}
            </div>
          </li>
          <li>
            <div>
              <a className="w-20">Model</a>
              {uniqueModel.map((name, index) => (
                <label key={index} className="flex w-36">
                  <input
                    type="checkbox"
                    value={name}
                    onChange={handleModelFilterBoxes}
                  />
                  <span className="ml-2">{name}</span>
                </label>
              ))}
            </div>
          </li>
          <li>
            <div>
              <a className="w-20">Color</a>
              {uniqueColor.map((name, index) => (
                <label key={index} className="flex w-36">
                  <input
                    type="checkbox"
                    value={name}
                    onChange={handleColorFilterBoxes}
                  />
                  <span className="ml-2">{name}</span>
                </label>
              ))}
            </div>
          </li>
          <li>
            <div>
              <a className="w-20">Left SN</a>
              {uniqueLeftSN.map((name, index) => (
                <label key={index} className="flex w-36">
                  <input
                    type="checkbox"
                    value={name}
                    onChange={handleLeftSNFilterBoxes}
                  />
                  <span className="ml-2">{name}</span>
                </label>
              ))}
            </div>
          </li>
          <li>
            <div>
              <a className="w-20">Right SN</a>
              {uniqueRightSN.map((name, index) => (
                <label key={index} className="flex w-36">
                  <input
                    type="checkbox"
                    value={name}
                    onChange={handleRightSNFilterBoxes}
                  />
                  <span className="ml-2">{name}</span>
                </label>
              ))}
            </div>
          </li>
          <li>
            <div>
              <a className="w-20">Remote</a>
              {uniqueRemote.map((name, index) => (
                <label key={index} className="flex w-36">
                  <input
                    type="checkbox"
                    value={name}
                    onChange={handleRemoteFilterBoxes}
                  />
                  <span className="ml-2">{name}</span>
                </label>
              ))}
            </div>
          </li>
          <li>
            <div>
              <a className="w-20">Charger</a>
              {uniqueCharger.map((name, index) => (
                <label key={index} className="flex w-36">
                  <input
                    type="checkbox"
                    value={name}
                    onChange={handleChargerFilterBoxes}
                  />
                  <span className="ml-2">{name}</span>
                </label>
              ))}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
