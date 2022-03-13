import {BsArrowLeftCircle, BsArrowRightCircle} from 'react-icons/bs'
import './index.css'
const Pagination = props => {
  const {usersData, handlePageNum, activePage} = props
  let PageNumbers = []
  for (let i = 1; i < Math.ceil(usersData.length / 10) + 1; i++) {
    PageNumbers.push(i)
  }

  return (
    <div>
        <button className="inactive-btn">
          <BsArrowLeftCircle />
        </button>
        {PageNumbers.map(page => (
          <button
            type="button"
            className={
              activePage !== page ? 'inactive-btn' : 'active-btn'
            }
            onClick={() => handlePageNum(page)}
          >
            {page}
          </button>
        ))}
        <button className="inactive-btn">
          <BsArrowRightCircle />
        </button>
    </div>
  )
}
export default Pagination