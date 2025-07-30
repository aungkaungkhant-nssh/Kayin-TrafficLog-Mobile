import { addOffenseCase } from '@/api/offense-case';
import { AlertModal } from '@/components/ui/AlertModal';
import CaseRecord from '@/components/ui/CaseRecords';
import DateFilter from '@/components/ui/DateFilter';
import ExportButton from '@/components/ui/ExportButton';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import NotFound from '@/components/ui/NotFound';
import { caseFilterWithDateData2 } from '@/database/offenderVehicles/offenderVehicles';
import { useCaseFilterWithDate } from '@/hooks/useCase';
import { ExportTypeEnum } from '@/utils/enum/ExportType';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { format } from 'date-fns';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

const Records = () => {
    const today = new Date();
    const [fromDate, setFromDate] = useState(format(today, 'yyyy-MM-dd'));
    const [toDate, setToDate] = useState(format(today, 'yyyy-MM-dd'));
    const [exportType, setExportType] = useState(ExportTypeEnum.All);
    const [visible, setVisible] = useState(false);
    const [isAlert, setIsAlert] = useState(false);
    const router = useRouter();

    const { cases, loading, loadMore, hasMore, setLoading } = useCaseFilterWithDate(
        fromDate,
        toDate,
    );

    const handleExport = async (isShare = false) => {
        setLoading(true)
        const data = await caseFilterWithDateData2(fromDate, toDate, exportType) as any;
        if (data.length) {
            const res = await addOffenseCase(data);
            if (res?.success) {
                setVisible(true)
            }
        }
        setLoading(false)
    }
    return (
        <View style={styles.container}>
            <AlertModal
                visible={isAlert}
                message="ဒေတာမရှိပါ။"
                onConfirm={() => setIsAlert(false)}
                onCancel={() => setIsAlert(false)}
                confirmText="ပိတ်မည်။"
            />
            <AlertModal
                visible={visible}
                onCancel={() => setVisible(false)}
                onConfirm={() => {
                    router.push("/(tabs)");
                    setVisible(false)
                }}
                message="ဒေတာထုတ်ခြင်း အောင်မြင်ပါသည်။"
                confirmText="မူလ စာမျက်နှာ"
                cancelText="ပိတ်မည်"
                icon={<MaterialIcons name="check-circle" size={70} color="#4CAF50" />}
            />
            {/* <ExportModal
                exportType={exportType}
                setExportType={setExportType}
                visible={visible}
                onCancel={() => setVisible(false)}
                onConfirm={() => handleExport()}
                onShare={() => handleExport(true)}
            /> */}
            <DateFilter
                fromDate={fromDate}
                toDate={toDate}
                setFromDate={setFromDate}
                setToDate={setToDate}
            />
            {/* {
                vehicleCategoryId && (
                    <VehicleCategoriesFilter
                        vehicleCategories={vehicleCategories}
                        vehicleCategoryId={vehicleCategoryId}
                        setVehicleCategoryId={setVehicleCategoryId}
                    />
                )
            } */}
            {
                (loading) ? (
                    <LoadingSpinner />
                ) : (
                    cases?.length ? (
                        <CaseRecord data={cases} onEndReached={loadMore} loading={loading} hasMore={hasMore} />
                    ) : (
                        <NotFound />
                    )
                )

            }
            <ExportButton onPress={handleExport} />
        </View>
    )
}

export default Records;

const styles = StyleSheet.create({
    container: {
        padding: 14,
        flex: 1
    },
    headerContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",

    }
})