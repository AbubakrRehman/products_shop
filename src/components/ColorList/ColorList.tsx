import { useEffect, useState } from "react";
import type { ProductColor } from "../Products/Products";
import plus_icon from "../../icons/plus-icon.png";
import minus_icon from "../../icons/minus-icon.png";
import { getColorFromCode } from "../../utils";

interface ProductColorListProps {
    productColorList: ProductColor[]
}

const ColorList: React.FC<ProductColorListProps> = (props) => {
    const { productColorList } = props;
    const [productColors, setProductColors] = useState(productColorList);
    const [isExpanded, setIsExpanded] = useState(false);
    const maxCircles = 3;

    useEffect(() => {
        if (isExpanded)
            setProductColors(productColorList.slice(0,))
        else
            setProductColors(productColorList.slice(0, maxCircles))
    }, [isExpanded])

    const handleButtonClick = () => {
        setIsExpanded((prev) => !prev)
    }


    return <div className='product-color-container'>
        <div className="circles">
            {productColors.map((color, index) => {
                return <li key={index} className="circle" style={{ backgroundColor: getColorFromCode(color.colorCode) }}></li>

            })}
        </div>
        {
            productColorList.length > 3 ?
                <button className="plus-btn" onClick={handleButtonClick}>
                    {isExpanded ? <img src={minus_icon} alt="minus-icon" /> : <img src={plus_icon} alt="plus-icon" />}
                </button>
                :
                null
        }

    </div>
}

export default ColorList