import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";
import { IoMdCheckmark } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";

import styled from "styled-components";
import { useState } from 'react';

const Button = styled.button`
  background-color: transparent;
  border: none;
  margin: 10px;
  height: 30px;
  weight: 30px;

  &:hover {
    > svg {
      color: red; 
    }
  }
`;

const ButtonContainer = styled.div`
  position: absolute;
  display: flex;
  right: 15px;
`;

const Input = styled.input`
  margin-left: 30px;
`;

const ToDo = ({
  id,
  isComplete,
  value,
  onClick,
  onDel,
  onUpdate
}) => {

  const [isEditClicked, setIsEditClicked] = useState(false);
  const [updatedValue, setUpdatedValue] = useState('');

  const handleModClick = (event) => {
    event.stopPropagation(); 
    setIsEditClicked(true);
  }

  const handleDelClick = (event) => {
    event.stopPropagation(); 
    onDel(id); 
  }

  
  const handleUpdateClick = (event) => {
    event.stopPropagation();
    onUpdate(updatedValue, id)
    setUpdatedValue('');
    setIsEditClicked(false);
    onClick();
  }

  const handleCancelClick = (event) => {
    event.stopPropagation();
    setIsEditClicked(false);
    onClick();
  }

  return (
    <>
      <div
        className="to-do"
        data-is-complete={isComplete}
        onClick={onClick}
      >
        {isEditClicked
          ? (
            <div>
              <Input 
                onChange={(e) => setUpdatedValue(e.target.value)}
                value={updatedValue}
              />
            </div>
          ) : (
            <>
              <p>{isComplete && <span>&#10004;</span>}</p>
              <p>{value}</p>
            </>
          )
        }
        {isEditClicked
          ? (
            <ButtonContainer>
              <Button onClick={handleUpdateClick}>
                <IoMdCheckmark />
              </Button>
              <Button onClick={handleCancelClick}>
                <AiOutlineClose />
              </Button>
            </ButtonContainer>
          ) : (
            <ButtonContainer>
              <Button onClick={handleModClick}>
                <MdEdit />
              </Button>
              <Button onClick={handleDelClick}>
                <FaTrash />
              </Button>
            </ButtonContainer>
          )
        }
      </div>
    </>

  )
}

export default ToDo;