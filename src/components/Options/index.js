import {Component} from 'react'
import './index.css'

class OptionsContent extends Component {
  renderDefault = () => {
    const {options} = this.props
    // console.log(options)

    return (
      <ul className="default-options">
        {options.map(eachOption => {
          const {changeOption, activeOption} = this.props
          const onClickOption = () => {
            changeOption(eachOption.idOption)
            console.log(eachOption.idOption)
          }

          const optionClassName =
            activeOption === eachOption.idOption
              ? 'btn-characteristics selected-option-bg-color'
              : 'btn-characteristics'

          return (
            <li key={eachOption.idOption} onClick={onClickOption}>
              {/* <button type="button" className="btn-class" value={eachOption}>
               */}
              <button
                type="button"
                className={optionClassName}
                value={eachOption}
              >
                <p className="btn-data">{eachOption.text}</p>
              </button>
            </li>
          )
        })}
      </ul>
    )
  }

  // renderSingleOptions = () => {
  //   const {options} = this.props

  //   return (
  //     <div className="single-option-container">
  //       <select className="single-option">
  //         {options.map(eachOption => {
  //           const {onChangeSingleOption, activeOption} = this.props
  //           const onChangeOfValue = event => {
  //             onChangeSingleOption(event.target.value)
  //             console.log(event.target.value)
  //             console.log(eachOption.idOption)
  //           }

  //           const activeOptionClassName =
  //             activeOption === eachOption.idOption ? 'single-option-text' : ''
  //           return (
  //             <option
  //               key={eachOption.optionId}
  //               value={eachOption}
  //               className={activeOptionClassName}
  //               onChange={onChangeOfValue}
  //             >
  //               {eachOption.text}
  //             </option>
  //           )
  //         })}
  //       </select>
  //     </div>
  //   )
  // }
  renderSingleOptions = () => {
    const {options, onChangeOption} = this.props

    const onChangeOfValue = event => {
      const selectedOptionId = event.target.value
      onChangeOption(selectedOptionId)
      console.log('HELOO')
    }

    return (
      <div className="items-single-option">
        <div className="single-option-container">
          <select className="single-option" onChange={onChangeOfValue}>
            {options.map(eachOption => {
              const {activeOption} = this.props

              const activeOptionClassName =
                activeOption === eachOption.idOption ? 'single-option-text' : ''
              return (
                <option
                  key={eachOption.idOption}
                  value={eachOption.idOption}
                  className={activeOptionClassName}
                >
                  {eachOption.text}
                </option>
              )
            })}
          </select>
        </div>

        {/* <div className="caution-item">
          <img
            src="https://res.cloudinary.com/dowxofd2k/image/upload/v1714244506/Round_h6sgdt.png"
            alt="caution"
          />
        </div> */}
      </div>
    )
  }

  renderImage = () => {
    const {options} = this.props

    return (
      <ul className="Image-options-container">
        {options.map(eachOptions => {
          const {changeOption, activeOption} = this.props
          const onClickImage = () => {
            changeOption(eachOptions.idOption)
          }

          const activeImageClassName =
            activeOption === eachOptions.idOption
              ? 'active-image-class'
              : 'image-list-item'
          return (
            <li onClick={onClickImage} className={activeImageClassName}>
              <button type="button" className="options-btn">
                <img
                  key={eachOptions.idOption}
                  src={eachOptions.imageUrl}
                  className="image-options"
                  alt={eachOptions.text}
                />
              </button>
            </li>
          )
        })}
      </ul>
    )
  }

  render() {
    const {optionType} = this.props

    switch (optionType) {
      case 'DEFAULT':
        return this.renderDefault()
      case 'SINGLE_SELECT':
        return this.renderSingleOptions()
      case 'IMAGE':
        return this.renderImage()
      default:
        return null
    }
  }
}

export default OptionsContent
