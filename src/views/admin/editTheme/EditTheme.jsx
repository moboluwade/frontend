import { useRef, useState } from "react"
import editImg from "./../../../assets/edit-3-svgrepo-com.svg"
import TestSteps from "./testSteps";
import { Divider } from 'antd';
import FirstPane from "./FirstPane";
import SearchPane from "./SearchPane";
import ThirdPane from "./ThirdPane";
import { Input } from 'antd';
const { Search } = Input;
import { useQuery } from "@tanstack/react-query";

const onChange = (e) => {
    console.log('Change:', e.target.value);
};


const EditTheme = () => {
    const [title, setTitle] = useState('')
    const [current, setCurrent] = useState(0);
    const inputRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false)
    const views = [{ id: 1, element: <FirstPane isOpen={isOpen} setIsOpen={setIsOpen} setOnChange={onChange} /> }, { id: 2, element: <SearchPane /> }, { id: 3, element: <ThirdPane /> }]

    const onSearch = (value, _e, info) => console.log(info?.source, value);

    const focusInput = () => {
        // Focus the input element when the button is clicked
        inputRef.current.focus();
    }


    return (
        <div className="w-full h-screen pt-24 pl-8 mx-aut">
            <div className="flex flex-col h-full">
                {isOpen ?
                    <Search placeholder="input search text" allowClear onSearch={onSearch} style={{ width: 680, height: 300 }} />
                    :
                    <div className="flex flex-row justify-start">
                        <input
                            className="text-4xl font-semibold text-black w-[16rem] h-[3rem] bg-[#EBEDEF]  placeholder:text-black focus:outline-none"
                            type="text"
                            placeholder="New Theme"
                            ref={inputRef}
                            value={title} onChange={(e) => { setTitle(e.target.value) }} />
                        <button
                            onClick={focusInput}>
                            <img draggable={false} className="inline-block w-5 h-5" src={editImg} alt="edit" />
                        </button>
                    </div>
                }
                <Divider />
                <div className="flex flex-row h-full ">
                    <div className="flex flex-col w-[70%] h-full ">
                        <div className="flex flex-col h-[70%] ">
                            {views.map((view) => {
                                return (
                                    (view.id) === current + 1 && (<div key={view.id} className="h-screen overflow-y-scroll">{view.element}</div>)
                                )
                            })}

                        </div>
                    </div>
                    <div className="flex flex-col w-[30%] pl-4">
                        <TestSteps current={current} setCurrent={setCurrent} />
                        <button
                            onClick={() => setCurrent(current + 1)}
                            className="flex px-4 py-2 text-lg font-semibold text-white uppercase bg-blue-500 border rounded-lg place-self-end w-fit">next</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditTheme