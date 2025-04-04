"use client"
import * as yup from 'yup';
import { useFormikContext, Formik } from "formik";

import useUser from "grandus-lib/hooks/useUser";

import get from "lodash/get";
import map from "lodash/map";
import isEmpty from "lodash/isEmpty";
import forEach from "lodash/forEach";
import toNumber from "lodash/toNumber";
import first from "lodash/first";

import {
    LETTERS_ONLY_REGEX,
    BUSINESS_ID_REGEX,
    VAT_ID_REGEX,
    VAT_NUMBER_REGEX,
} from "grandus-lib/constants/ValidatorConstants";
import {ZIP_REGEX, PHONE_NUMBER_REGEX, CITY_REGEX} from "constants/AppConstants";

import TextInput from "components/_other/form/TextInput";
import SelectInput from "components/_other/form/SelectInput";
import CheckboxInput from "components/_other/form/CheckboxInput";
import CustomButton from "@/components/_other/button/CustomButton";
import Alert from "components/_other/alert/Alert";
import { useState } from "react";
import {useTranslation} from "@/app/i18n/client";

const Profile = ({ user, towns, countries }) => {

    const { t } = useTranslation();
    const { mutateUser } = useUser();
    const [alert, setAlert] = useState(null);

    const getDefaultCountryValue = (attribute = "countryId") => {
        let countryId = get(user, ["attributes", attribute]);
        if (!countryId) {
            countryId = get(first(countries), "id");
        }
        return toNumber(countryId);
    };

    const formProps = {
        enableReinitialize: true,
        initialValues: {
            name: user?.attributes?.name || "",
            surname: user?.attributes?.surname || "",
            street: user?.attributes?.street || "",
            city: user?.attributes?.city || "",
            zip: user?.attributes?.zip || "",
            phone: user?.attributes?.phone || "",
            email: user?.attributes?.email || "",
            countryId: getDefaultCountryValue(),
            isCompany: !isEmpty(user?.attributes?.ico),
            companyName: user?.attributes?.companyName || "",
            ico: user?.attributes?.ico || "",
            dic: user?.attributes?.dic || "",
            icDPH: user?.attributes?.icDPH || "",
        },
        validationSchema: yup.object({
            name: yup
                .string()
                .nullable()
                .required(t('profile_form.firstname.required_validation'))
                .min(2, t('profile_form.firstname.min_validation'))
                .matches(LETTERS_ONLY_REGEX, {
                    excludeEmptyString: true,
                    message: t('profile_form.firstname.matches_validation'),
                })
                .trim(),
            surname: yup
                .string()
                .nullable()
                .required(t('profile_form.surname.required_validation'))
                .min(2, t('profile_form.surname.min_validation'))
                .matches(LETTERS_ONLY_REGEX, {
                    excludeEmptyString: true,
                    message: t('profile_form.surname.matches_validation'),
                })
                .trim(),
            street: yup.string().nullable(),
            city: yup
                .string()
                .nullable()
                .matches(CITY_REGEX, {
                    excludeEmptyString: true,
                    message: t('profile_form.city.matches_validation'),
                })
                .trim(),
            zip: yup
                .string()
                .nullable()
                .matches(ZIP_REGEX, t('profile_form.zip.matches_validation'))
                .trim(),
            phone: yup.string().trim().nullable().matches(PHONE_NUMBER_REGEX, {
                excludeEmptyString: true,
                message: t('profile_form.phone.matches_validation'),
            }),
            email: yup
                .string()
                .nullable()
                .email(t('profile_form.email.email_validation'))
                .required(t('profile_form.email.required_validation')),
            countryId: yup.number().nullable(),
            isCompany: yup.bool().transform((v) => !!toNumber(v)), //convert to boolean before validation
            companyName: yup
                .string()
                .nullable()
                .when("isCompany", {
                    is: true,
                    then: schema => schema.nullable().trim().required(t('profile_form.company_name.required_validation')),
                }),
            ico: yup
                .string()
                .nullable()
                .trim()
                .when("isCompany", {
                    is: true,
                    then: schema =>
                        schema
                        .nullable()
                        .trim()
                        .required(t('profile_form.ico.required_validation'))
                        .matches(BUSINESS_ID_REGEX, {
                            excludeEmptyString: true,
                            message: ('profile_form.ico.matches_validation'),
                        }),
                }),
            dic: yup
                .string()
                .nullable()
                .matches(VAT_ID_REGEX, {
                    excludeEmptyString: true,
                    message: t('profile_form.dic.matches_validation'),
                })
                .trim(),
            icDPH: yup
                .string()
                .nullable()
                .matches(VAT_NUMBER_REGEX, {
                    excludeEmptyString: true,
                    message: t('profile_form.ic_dph.matches_validation'),
                })
                .trim(),
        }),
        onSubmit: async (values, { errors }) => {
            const key = `message-profile-edit`;
            setAlert(null);
            try {
                const response = await fetch(`/api/lib/v1/auth/profile`, {
                    method: "PUT",
                    body: JSON.stringify({ user: values }),
                }).then((response) => response.json());
                if (get(response, "messages")) {
                    setAlert({
                        type: "error",
                        message: t('profile_form.messages.fail'),
                    });
                    forEach(get(response, "messages", []), (res) => {
                        setFieldError(get(res, "field"), get(res, "message"));
                    });
                } else {
                    setAlert({
                        type: "success",
                        message: t('profile_form.messages.success'),
                    });
                    await mutateUser(response, false);
                }
            } catch (error) {
                setAlert({
                    type: "error",
                    message: t('profile_form.messages.error', { error }),
                });

                console.error("An unexpected error happened:", error);
            }
        },
    };
    return (
        <div className="container">
            <Formik {...formProps}>
                <ProfileForm countries={countries} towns={towns} alert={alert} />
            </Formik>
        </div>
    );
};

const ProfileForm = ({ towns, countries, alert }) => {
    const {
        values,
        touched,
        errors,
        isSubmitting,
        setFieldValue,
        setFieldTouched,
        handleChange,
        handleBlur,
        handleSubmit,
    } = useFormikContext();

    const isCompany = !!toNumber(values?.isCompany);

    return (
        <form onSubmit={handleSubmit}>
            <div className="mt-6">
                <h3 className="mb-3">Osobné údaje</h3>
                <div className="flex gap-8">
                    <div className="w-full md:w-1/2">
                        <TextInput
                            required
                            label="Meno:"
                            error={touched?.name && errors?.name ? errors.name : ""}
                            inputProps={{
                                id: "name",
                                name: "name",
                                onChange: handleChange,
                                onBlur: handleBlur,
                                value: values?.name,
                                groupClassName: 'mb-3'
                            }}
                        />
                    </div>
                    <div className="w-full md:w-1/2">
                        <TextInput
                            required
                            label="Priezvisko:"
                            error={
                                touched?.surname && errors?.surname ? errors.surname : ""
                            }
                            inputProps={{
                                id: "surname",
                                name: "surname",
                                onChange: handleChange,
                                onBlur: handleBlur,
                                value: values?.surname,
                                groupClassName: 'mb-3'
                            }}
                        />
                    </div>
                </div>
                <div className="flex gap-8">
                    <div className="w-full md:w-1/2">
                        <TextInput
                            required
                            label="E-mail:"
                            error={touched?.email && errors?.email ? errors.email : ""}
                            inputProps={{
                                id: "email",
                                name: "email",
                                type: "email",
                                onChange: handleChange,
                                onBlur: handleBlur,
                                value: values?.email,
                                groupClassName: 'mb-3'
                            }}
                        />
                    </div>
                    <div className="w-full md:w-1/2">
                        <TextInput
                            required
                            label="Telefón:"
                            error={touched?.phone && errors?.phone ? errors.phone : ""}
                            inputProps={{
                                id: "phone",
                                name: "phone",
                                type: "tel",
                                onChange: handleChange,
                                onBlur: handleBlur,
                                value: values?.phone,
                                groupClassName: 'mb-3'
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <h3 className="mb-3">Adresa</h3>
                <TextInput
                    required
                    label="Ulica:"
                    error={touched?.street && errors?.street ? errors.street : ""}
                    inputProps={{
                        id: "street",
                        name: "street",
                        onChange: handleChange,
                        onBlur: handleBlur,
                        value: values?.street,
                        groupClassName: 'mb-3'
                    }}
                />
                <div className="flex gap-8">
                    <div className="w-full md:w-3/5">
                        <TextInput
                            required
                            label="Mesto:"
                            error={touched?.city && errors?.city ? errors.city : ""}
                            inputProps={{
                                id: "city",
                                name: "city",
                                onChange: handleChange,
                                onBlur: handleBlur,
                                value: values?.city,
                                groupClassName: 'mb-3'
                            }}
                        />
                    </div>
                    <div className="w-full md:w-2/5">
                        <TextInput
                            required
                            label="PSČ:"
                            error={touched?.zip && errors?.zip ? errors.zip : ""}
                            inputProps={{
                                id: "zip",
                                name: "zip",
                                type: "text",
                                pattern: "[0-9]*",
                                onChange: handleChange,
                                onBlur: handleBlur,
                                value: values?.zip,
                                groupClassName: 'mb-3'
                            }}
                        />
                    </div>
                </div>
                <SelectInput
                    label="Krajina:"
                    value={values?.countryId}
                    error={
                        touched?.countryId && errors?.countryId ? errors.countryId : ""
                    }
                    inputProps={{
                        id: "countryId",
                        name: "countryId",
                        onChange: handleChange,
                        onBlur: handleBlur,
                        disabled: true,
                        options: map(countries, (country) => {
                            return {
                                value: country?.id,
                                label: country?.name,
                            };
                        }),
                        groupClassName: 'mb-3'
                    }}
                />
            </div>

            <div className="mt-6">
                <CheckboxInput
                    label="Nakupujete ako firma? Želáte si pridať firemné údaje?"
                    error={
                        touched?.isCompany && errors?.isCompany ? errors.isCompany : ""
                    }
                    inputProps={{
                        id: "isCompany",
                        name: "isCompany",
                        onChange: handleChange,
                        onBlur: handleBlur,
                        value: 1,
                        checked: isCompany,
                        groupClassName: 'mb-3'
                    }}
                />
                <div className={`${!isCompany ? "hidden" : ""}`}>
                    <h3 className="mb-3">Firemné údaje</h3>
                    <div className={`${!isCompany ? "hidden" : ""}`}>
                        <div className="w-full">
                            <TextInput
                                required
                                label="Názov spoločnosti:"
                                error={
                                    touched?.companyName && errors?.companyName
                                        ? errors.companyName
                                        : ""
                                }
                                inputProps={{
                                    id: "companyName",
                                    name: "companyName",
                                    onChange: handleChange,
                                    onBlur: handleBlur,
                                    value: values?.companyName,
                                    groupClassName: 'mb-3'
                                }}
                            />
                        </div>
                        <div className="flex gap-8">
                            <div className="w-full md:w-1/3">
                                <TextInput
                                    required
                                    label="IČO:"
                                    error={touched?.surname && errors?.ico ? errors.ico : ""}
                                    inputProps={{
                                        id: "ico",
                                        name: "ico",
                                        onChange: handleChange,
                                        value: values?.ico,
                                        groupClassName: 'mb-3'
                                    }}
                                />
                            </div>
                            <div className="w-full md:w-1/3">
                                <TextInput
                                    required
                                    label="DIČ:"
                                    error={touched?.dic && errors?.dic ? errors.dic : ""}
                                    inputProps={{
                                        id: "dic",
                                        name: "dic",
                                        onChange: handleChange,
                                        value: values?.dic,
                                        groupClassName: 'mb-3'
                                    }}
                                />
                            </div>
                            <div className="w-full md:w-1/3">
                                <TextInput
                                    required
                                    label="IČ DPH:"
                                    error={touched?.icDPH && errors?.icDPH ? errors.icDPH : ""}
                                    inputProps={{
                                        id: "icDPH",
                                        name: "icDPH",
                                        onChange: handleChange,
                                        value: values?.icDPH,
                                        groupClassName: 'mb-3'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-4">
                {!isEmpty(alert) ? <Alert className="mb-3" {...alert} /> : null}
                <CustomButton round htmlType="submit" fullWidth loading={isSubmitting}>
                    Uložiť
                </CustomButton>
            </div>
        </form>
    );
};

export default Profile;
