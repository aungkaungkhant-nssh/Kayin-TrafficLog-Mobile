import globalStyles from '@/styles/globalStyles'
import { ExistenceStatus } from '@/utils/enum/ExistenceStatus'
import React, { useState } from 'react'
import { Controller } from 'react-hook-form'
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native'
import { RadioButton } from 'react-native-paper'
import NationalIdInput from '../NationalIdInput'
import AppButton from '../ui/AppButton'
import AppTextInput from '../ui/AppTextInput'
import { InfoProps } from './FirstInfo'

const SecondInfo = ({ control, watch, setCurrentInfo, trigger, errors }: InfoProps) => {
    const [checked, setChecked] = useState(ExistenceStatus.No);
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <View style={styles.inputWrapper}>
                <Controller
                    control={control}
                    name="name"
                    render={({ field: { onChange, value } }) => (
                        <AppTextInput
                            label="ယာဉ်မောင်းအမည်"
                            value={value}
                            onChangeText={onChange}
                            multiline={true}
                        />
                    )}
                />
                {errors.name && (
                    <Text style={globalStyles.errorText}>{errors.name.message}</Text>
                )}
            </View>
            <Controller
                control={control}
                name="nrcExistence"
                render={({ field: { onChange, value } }) => (
                    <View>
                        <Text style={{ color: "#333" }}>မှတ်ပုံတင်အမှတ်</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 8 }}>
                                <RadioButton
                                    value={ExistenceStatus.No}
                                    status={value === ExistenceStatus.No ? 'checked' : 'unchecked'}
                                    onPress={() => onChange(ExistenceStatus.No)}
                                />
                                <Text onPress={() => onChange(ExistenceStatus.No)}>မရှိ</Text>
                            </View>
                            <Text>{" / "}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <RadioButton
                                    value={ExistenceStatus.Yes}
                                    status={value === ExistenceStatus.Yes ? 'checked' : 'unchecked'}
                                    onPress={() => onChange(ExistenceStatus.Yes)}
                                />
                                <Text onPress={() => onChange(ExistenceStatus.Yes)}>ရှိ</Text>
                            </View>
                        </View>
                    </View>
                )}
            />

            {watch("nrcExistence") === ExistenceStatus.Yes && (
                <NationalIdInput control={control} watch={watch} errors={errors} />
            )}



            <View style={styles.inputWrapper}>
                <Controller
                    control={control}
                    name="father_name"
                    render={({ field: { onChange, value } }) => (
                        <AppTextInput
                            label="အဘအမည်"
                            value={value}
                            onChangeText={onChange}
                            multiline={true}
                        />
                    )}
                />
                {errors.father_name && (
                    <Text style={globalStyles.errorText}>{errors.father_name.message}</Text>
                )}
            </View>



            <View style={styles.inputWrapper}>
                <Controller
                    control={control}
                    name="address"
                    render={({ field: { onChange, value } }) => (
                        <AppTextInput
                            label="နေရပ်လိပ်စာ"
                            value={value}
                            onChangeText={onChange}
                            multiline={true}
                        />
                    )}
                />
                {errors.address && (
                    <Text style={globalStyles.errorText}>{errors.address.message}</Text>
                )}
            </View>
            <View style={styles.btnContainer}>
                <AppButton
                    label='နောက်သို့'
                    onPress={() => setCurrentInfo(1)}
                    loading={false}
                    mode={"outlined"}

                />

                <AppButton
                    label="ရှေ့သို့"
                    onPress={async () => {
                        const fields = [
                            "name",
                            "father_name",
                            "address",
                            checked === ExistenceStatus.Yes ? "nrcNumber" : null,
                        ].filter(Boolean) as ("name" | "father_name" | "address" | "nrcNumber")[]; // explicitly cast to the correct type

                        const valid = await trigger(fields);
                        console.log(fields)
                        if (valid) {
                            setCurrentInfo(3);
                        }
                    }}
                    loading={false}
                />

            </View>
        </KeyboardAvoidingView>
    )
}

export default SecondInfo;

const styles = StyleSheet.create({
    inputWrapper: {
        marginBottom: 15,
    },

    btnContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
});