import React from "react"
import { convertTime } from "../utils/utils"
import arm from "../assets/images/body/arm.png"
import biceps from "../assets/images/body/biceps.png"
import chest from "../assets/images/body/chest.png"
import fat from "../assets/images/body/fat.png"
import hip from "../assets/images/body/hip.png"
import leg from "../assets/images/body/leg.png"
import shoulder from "../assets/images/body/shoulder.png"
import subs from "../assets/images/body/subs.png"
import triceps from "../assets/images/body/triceps.png"
import waist from "../assets/images/body/waist2.png"
import weight from "../assets/images/body/kg.png"

import arrow from "../assets/images/downarrow.png"

import useToggle from "../customHooks/useToggle"

const TableMeasurement = ({ data }) => {
  const [value, toggleValue] = useToggle(false)
  return (
    <div className="measurement-table-container">
      <h2 className="display-f align-center">
        {data.timeStamp && convertTime(data.timeStamp)}{" "}
        <button onClick={() => toggleValue((prev) => !prev)}>
          <img src={arrow} alt="down arrow" className="arrow ml-1" />
        </button>
      </h2>
      {value && (
        <div className="flex-container">
          <div className="table-container">
            <img src={arm} alt="arm" />
            <div className="table-data">
              <div>Arm</div>
              <div>{data.arm}</div>
            </div>
          </div>
          <div className="table-container">
            <img src={biceps} alt="biceps" />
            <div className="table-data">
              <div>Biceps</div>
              <div>{data.biceps}</div>
            </div>
          </div>
          <div className="table-container">
            <img src={chest} alt="chest" />
            <div className="table-data">
              <div>Chest</div>
              <div>{data.chest}</div>
            </div>
          </div>
          <div className="table-container">
            <img src={fat} alt="fat" />
            <div className="table-data">
              <div>Fat</div>
              <div>{data.fat}</div>
            </div>
          </div>
          <div className="table-container">
            <img src={hip} alt="hip" className="hip" />
            <div className="table-data">
              <div>Hip</div>
              <div>{data.hip}</div>
            </div>
          </div>
          <div className="table-container">
            <img src={leg} alt="leg" />
            <div className="table-data">
              <div>Leg</div>
              <div>{data.leg}</div>
            </div>
          </div>
          <div className="table-container">
            <img src={shoulder} alt="shoulder" />
            <div className="table-data">
              <div>Shoulder</div>
              <div>{data.shoulder}</div>
            </div>
          </div>
          <div className="table-container">
            <img src={subs} alt="subscapular" />
            <div className="table-data">
              <div>Subscapular</div>
              <div>{data.subscapular}</div>
            </div>
          </div>
          <div className="table-container">
            <img src={triceps} alt="triceps" />
            <div className="table-data">
              <div>Triceps</div>
              <div>{data.triceps}</div>
            </div>
          </div>
          <div className="table-container">
            <img src={waist} alt="waist" className="waist" />
            <div className="table-data">
              <div>Waist</div>
              <div>{data.waist}</div>
            </div>
          </div>
          <div className="table-container">
            <img src={weight} alt="weight" />
            <div className="table-data">
              <div>Weight</div>
              <div>{data.weight}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TableMeasurement
