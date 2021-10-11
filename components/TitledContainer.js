import PropTypes from 'prop-types';
import underlineIcon from '../public/images/underline.png'

const TitledContainer = (props) => {
  const { color, textcolor, size, title, children, align, imgsrctype } = props;

  return (
    <div data-test="titledcontainer" className={`text-${textcolor} bg-${color} text-${size} font-bold ${align} flex flex-col w-full h-full `}>
      <div className="pb-3 pt-6 ml-7 justify-start sm:text-2xl md:text-base">
        {title}
        <img src={`images/underline${imgsrctype}.png`} className="sm:object-none md:w-6" />
      </div>
      <div className="flex justify-center">
        {children}
      </div>

    </div>
  );
};

TitledContainer.propTypes = {
  title: PropTypes.string.isRequired,
  textcolor: PropTypes.string,
  color: PropTypes.string,
  imgsrctype: PropTypes.string,
  size: PropTypes.string,
  align: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

TitledContainer.defaultProps = {
  textcolor: 'white-light',
  imgsrctype: '',
  color: 'white',
  size: '1xl',
  align: 'justify-start',
  children: <div />,
};

export default TitledContainer;
