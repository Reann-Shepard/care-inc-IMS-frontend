'use client';
import Link from 'next/link';
import { eventNames } from 'process';
import React, { useEffect, useState, useRef } from 'react';

interface Package {
  company: string;
  model: string;
  color: string;
  leftSN: string;
  rightSN: string;
  remote: string;
  charger: string;
}

export default function Packages() {
  const [packages, setPackages] = useState<Package[]>([]);
  const sortByRef = useRef<HTMLDetailsElement>(null);
  const [sortBy, setSortBy] = useState<string>('company');
  const [sortByTitle, setSortByTitle] = useState<string>('Company');
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

  // const [selectedFilterBoxes, setSelectedFilterBoxes] = useState<string[]>([]);

  const handleSortBy = (sortBy: string) => {
    setSortBy(sortBy);
    const sortBy_title = sortBy[0].toUpperCase() + sortBy.slice(1);
    setSortByTitle(sortBy_title);
    if (sortByRef.current) {
      sortByRef.current.removeAttribute('open');
    }
    // console.log(sortBy);
  };

  // const handleFilterBoxes = (e: React.ChangeEvent<HTMLInputElement>) => {
  // const { value } = e.target;
  // setSelectedFilterBoxes((prev) => {
  //     if (prev.includes(value)) {
  //         return prev.filter((item) => item !== value);
  //     } else {
  //         return [...prev, value];
  //     }
  // });
  //method 2
  // const value = e.target.value;
  // if (e.target.checked) {
  //     setSelectedFilterBoxes([...selectedFilterBoxes, value]);
  // } else {
  //     setSelectedFilterBoxes(selectedFilterBoxes.filter((item) => item !== value));
  // }
  // }

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
  // console.log(selectedCompanyFilterBoxes);

  useEffect(() => {
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

    if (sortBy === 'company') {
      packages.sort((a, b) => a.company.localeCompare(b.company));
    }
    if (sortBy === 'model') {
      packages.sort((a, b) => a.model.localeCompare(b.model));
    }
    if (sortBy === 'color') {
      packages.sort((a, b) => a.color.localeCompare(b.color));
    }
    if (sortBy === 'leftSN') {
      packages.sort((a, b) => a.leftSN.localeCompare(b.leftSN));
    }
    if (sortBy === 'rightSN') {
      packages.sort((a, b) => a.rightSN.localeCompare(b.rightSN));
    }
    if (sortBy === 'remote') {
      packages.sort((a, b) => a.remote.localeCompare(b.remote));
    }
    if (sortBy === 'charger') {
      packages.sort((a, b) => a.charger.localeCompare(b.charger));
    }
    setPackages(packages);
  }, [sortBy]);

  // const companyName = packages.map((eachPackage) => eachPackage.company);
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
    <div>
      <p className="text-2xl text-center">(Header and NavBar)</p>
      <div className="flex m-10 justify-between">
        <div className="flex items-center">
          <div className="flex items-center">
            <div className="text-xs">Sort By: </div>
            {/* <div className='dropdown dropdown-hover'>
                        <div tabIndex={0} role='button' className='btn btn-xs m-1 px-7'>{sortBy}</div>
                        <ul tabIndex={0} className='menu dropdown-content z-[1] bg-base-100 shadow rounded-box w-52'>
                            <li onClick={() =>handleSortBy("company")}><a>Company</a></li>
                            <li onClick={() =>handleSortBy("model")}><a>Model</a></li>
                            <li onClick={() =>handleSortBy("color")}><a>Color</a></li>
                            <li onClick={() =>handleSortBy("leftSN")}><a>Left SN</a></li>
                            <li onClick={() =>handleSortBy("rightSN")}><a>Right SN</a></li>
                            <li onClick={() =>handleSortBy("remote")}><a>Remote</a></li>
                            <li onClick={() =>handleSortBy("charger")}><a>Charger</a></li>
                        </ul>
                    </div> */}
            <details
              ref={sortByRef}
              className="dropdown dropdown-hover rounded-lg"
            >
              <summary className="m-2 pr-7 btn btn-xs select">
                {sortByTitle}
              </summary>
              <div className="shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                <ul>
                  <li onClick={() => handleSortBy('company')}>
                    <a>Company</a>
                  </li>
                  <li onClick={() => handleSortBy('model')}>
                    <a>Model</a>
                  </li>
                  <li onClick={() => handleSortBy('color')}>
                    <a>Color</a>
                  </li>
                  <li onClick={() => handleSortBy('leftSN')}>
                    <a>Left SN</a>
                  </li>
                  <li onClick={() => handleSortBy('rightSN')}>
                    <a>Right SN</a>
                  </li>
                  <li onClick={() => handleSortBy('remote')}>
                    <a>Remote</a>
                  </li>
                  <li onClick={() => handleSortBy('charger')}>
                    <a>Charger</a>
                  </li>
                </ul>
              </div>
            </details>
          </div>
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

          {/* <div className="mr-2 p-2 border-2 rounded-lg">sort by</div> */}
          {/* <details className="dropdown">
                    <summary className="dropdown-summary">Company</summary>
                    <div className="dropdown-content">
                        {packages.map((eachPackage, index) => (
                            <p key={index}>{eachPackage.company}</p>
                        ))}
                    </div>
                </details> */}
        </div>
        <button className="btn px-8 btn-success">
          <Link href="/packages/add_package">+</Link>
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table border-2">
          <thead>
            <tr className="text-lg text-black bg-gray-200 text-center">
              <th>Company</th>
              <th>Model</th>
              <th>Color</th>
              <th>Left SN</th>
              <th>Right SN</th>
              <th>Remote</th>
              <th>Charger</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((eachPackage, index) => (
              <tr key={index} className="text-lg text-center hover">
                <td>{eachPackage.company}</td>
                <td>{eachPackage.model}</td>
                <td>{eachPackage.color}</td>
                <td>{eachPackage.leftSN}</td>
                <td>{eachPackage.rightSN}</td>
                <td>{eachPackage.remote}</td>
                <td>{eachPackage.charger}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  {
    /* <div className="w-full h-10 my-5 bg-gray-200 "></div> */
  }
}
