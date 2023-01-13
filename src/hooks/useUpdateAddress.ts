import axios from 'axios';
import { useEffect, useState } from 'react';

import { shopAPI } from '../config/httpConfig';

import { IBasket } from '@basket-types';
import { UseBasket } from '../contexts/Basket.context';
import { IBasketContext } from '@context-types';
import { IAddress } from '@compound-types';
import { IAddressForm } from '@form-types';

export const useUpdateAddress = () => {
    const { basket, setBasket } = UseBasket() as IBasketContext
	const [dataError, setDataError] = useState<string | null>(null);
    const [address, setAddress] = useState<IAddress | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const makeUpdateRequest = (tokenData: string | null, data: IAddressForm) => {
        if (tokenData) {
            setToken(tokenData)
        }
		if (data) {
			let formValues: IAddress = {
				first_name: data.firstName,
				last_name: data.lastName,
				full_name: data.firstName + ' ' + data.lastName,
				address1: data.address,
				city: data.city,
				country_code: data.country,
				postal_code: data.zip,
				phone: data.phone,
				state_code: data.state
			}
			setAddress(formValues)
		}
    }

	useEffect(() => {
		if (token && basket && address) {
			axios.put<IBasket>(
				`${shopAPI}/baskets/${basket.basket_id}/billing_address?use_as_shipping=true`,
				{...address},
				{
					headers: {
						Authorization: token,
					},
				}
			).then(res => {
				setBasket(res.data)
				setAddress(null)
			}).catch(err => {
				setDataError(err.message)
				setAddress(null)
			});
			
		}
	}, [address, basket, setBasket, token]);

	return { makeUpdateRequest, dataError };
};
