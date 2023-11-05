"use client";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import axios from "axios";

interface PropsType {
  setSelectedValues: Dispatch<SetStateAction<string[]>>;
  selectedValues: string[];
  id: number;
}

interface DataArray {
  id: number;
  value: string;
  text: string;
  disable: boolean;
  position: number;
}

export const SectorComponent = ({
  setSelectedValues,
  selectedValues,
  id,
}: PropsType) => {
  const [dataArray, setDataArray] = useState<DataArray[]>([]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const options = event.target.options;
    const selectedItems: string[] = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedItems.push(options[i].value);
      }
    }
    setSelectedValues(selectedItems);
  };

  const getOption = async () => {
    const data = await axios({
      method: "GET",
      url: "/api/options",
    });
    setDataArray(data.data.data[0].DataArray);
  };

  useLayoutEffect(() => {
    getOption();
  }, []);

  const optionLabelStyle = "flex bg-gray-800 h-10 md:text-2xl items-center";
  const optionTextStyle =
    "flex bg-gray-500 h-8 items-center md:text-lg cursor-pointer hover:bg-gray-600";

  return (
    <div>
      <label className="block text-xl md:text-2xl mb-2 font-medium text-white">
        Sectors
      </label>
      <select
        value={selectedValues}
        multiple
        size={10}
        onChange={handleSelectChange}
        autoFocus
        className="w-full md:w-[40rem] focus:border-red-500"
      >
        {dataArray.map((data) => {
          if (data.position === 1) {
            return (
              <option
                key={data.id}
                className={optionLabelStyle}
                value={data.value}
                disabled={data.disable}
              >
                {data.text}
              </option>
            );
          }

          if (data.position === 2) {
            return (
              <option
                key={data.id}
                className={`${
                  data.disable ? optionLabelStyle : optionTextStyle
                } ps-6`}
                value={data.value}
                disabled={data.disable}
              >
                {data.text}
              </option>
            );
          }
          if (data.position === 3) {
            return (
              <option
                key={data.id}
                className={`${
                  data.disable ? optionLabelStyle : optionTextStyle
                } ps-12`}
                value={data.value}
                disabled={data.disable}
              >
                {data.text}
              </option>
            );
          }

          if (data.position === 4) {
            return (
              <option
                key={data.id}
                className={`${
                  data.disable ? optionLabelStyle : optionTextStyle
                } ps-20`}
                value={data.value}
                disabled={data.disable}
              >
                {data.text}
              </option>
            );
          }
        })}
      </select>
    </div>
  );
};
