/* eslint-disable react/prop-types */
// import { Flex, Input } from 'antd';
// import BlockCard from '../BlockCard';
// import AudioPlayer from './AudioPlayer';
import SearchResult from "./SearchResult";
// const { TextArea } = Input;

const FirstPaneBody = ({ pickedSearch, setPickedSearch }) => {
  const updateOption = (newOption, name) => {
    setPickedSearch((prevData) => {
      const index = prevData.findIndex((item) => item.name === name);
      if (index !== undefined) {
        const newData = [...prevData];
        newData[index] = { ...newData[index], option: newOption };
        return newData;
      }
      return prevData;
    });
  };

  return (
    <div className="overflow-hidden">
      <div className="relative flex flex-col w-full gap-4 pt-8 overflow-scroll overflow-x-hidden">
        {pickedSearch && Array.isArray(pickedSearch) ? (
          pickedSearch.map((search) => (
            <div key={search.name} className="w-fit h-fit">
              <SearchResult
                name={search.name}
                handleOption={updateOption}
                audio={search.audio}
                video={search.video}
                image={search.image}
                options={search.options}
              />
            </div>
          ))
        ) : (
          <div className="w-fit h-fit">
            <SearchResult
              name={pickedSearch.name}
              handleOption={updateOption}
              audio={pickedSearch.audio}
              video={pickedSearch.video}
              image={pickedSearch.image}
              options={pickedSearch.options}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FirstPaneBody;
