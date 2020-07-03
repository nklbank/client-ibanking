

import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal } from 'antd';
import { UserOutlined, PlusOutlined } from "@ant-design/icons"
import UserContext from "../../context/user/userContext";
import TransferInfor from './transferPageAtom/TransferInfor'
import Spinner from '../layout/Spinner'

const TransferPage = props => {


  const userContext = useContext(UserContext);

  const {
    beneficiaries,
    beneficiary,
    accountsOwner,
    getBeneficiry,
    loading
  } = userContext;

  const [isModal, setIsModal] = useState(false);
  // const [beneficiaryInfor, setBeneficiaryInfor] = ({})
  const onTransfer = (item) => {
    console.log(item)
    item.partner_bank && getBeneficiry({ account_number: item.beneficiary_account, bank: item.partner_bank })
    !item.partner_bank && getBeneficiry({ account_number: item.beneficiary_account })
    //  console.log(beneficiary)
    setIsModal(true)

  }

  return (
    <div>
      <Button type="primary" onClick={() => setIsModal(true)} icon={<PlusOutlined />} >new payee  </Button>
      <Modal
        title="Basic Modal"
        visible={isModal}
        onOk={() => setIsModal(false)}
        onCancel={() => setIsModal(false)}
      >
        {loading && <Spinner />}
        <TransferInfor beneficiary={beneficiary} />
      </Modal>
      {beneficiaries.map((item, key) => (
        <div className="card m-2" key={key} onClick={() => onTransfer(item)}>
          <div className="card-body">
            <b> <UserOutlined className="mr-2" />{item.beneficiary_name}</b>
            <span className="float-right">{item.beneficiary_account} {item.partner_bank && <span>- {item.partner_bank} </span>}</span>
          </div>
        </div>
      ))}
    </div>
  )
}


export default TransferPage
