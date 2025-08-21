import type { FC } from "react";
import ButtonPagination from "../ButtonPagination";

type Props = {
    paginationActive: number;
    handlePagination: (number: number) => void
    pagination: number
}
// pagination
const PaginationNumber: FC<Props> = ({ paginationActive, handlePagination, pagination }) => {


    return (
        <div className='w-full flex flex-row justify-start items-start gap-2.5'>
            {
                Array.from({ length: pagination }, (_, i) => (
                    <ButtonPagination key={i} active={paginationActive === i + 1} number={i + 1} handleButton={() => handlePagination(i + 1)} />
                ))
            }
        </div>
    )
}

export default PaginationNumber