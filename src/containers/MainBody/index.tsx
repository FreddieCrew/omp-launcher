import { t } from "i18next";
import { useContext } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import CheckBox from "../../components/CheckBox";
import Text from "../../components/Text";
import { ThemeContext } from "../../contexts/theme";
import {
  useGenericPersistentState,
  useGenericTempState,
} from "../../states/genericStates";
import BottomBar from "./BottomBar";
import ServerInfo from "./ServerInfo";
import SearchBar from "./ServerList/SearchBar";
import Favorites from "./ServerList/Tabs/Favorites";
import Internet from "./ServerList/Tabs/Internet";
import Partners from "./ServerList/Tabs/Partners";
import RecentlyJoined from "./ServerList/Tabs/RecentlyJoined";

const FiltersModal = () => {
  const { theme } = useContext(ThemeContext);
  const { showFilterMenu, searchData, setSearchData } = useGenericTempState();
  const { ompOnly, nonEmpty, unpassworded } = searchData;

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
      }}
    >
      <Pressable
        style={{
          height: "100%",
          width: "100%", // @ts-ignore
          cursor: "default",
        }}
        onPress={() => showFilterMenu(false)}
      />
      <View
        style={{
          position: "absolute",
          top: 25,
          left: 6,
          width: 200,
          padding: 5,
          paddingBottom: 6,
          backgroundColor: theme.secondary,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,
          borderRadius: 3,
        }}
      >
        <Text semibold size={1} color={theme.textPrimary}>
          {t("filters")}:
        </Text>
        <Pressable
          style={{ flexDirection: "row", alignItems: "center", marginTop: 3 }}
          onPress={() => setSearchData("ompOnly", !ompOnly)}
        >
          <CheckBox value={ompOnly} style={{ marginRight: 5 }} />
          <Text size={1} color={theme.textPrimary}>
            {t("filter_only_omp_servers")}
          </Text>
        </Pressable>
        <Pressable
          style={{ flexDirection: "row", alignItems: "center", marginTop: 2 }}
          onPress={() => setSearchData("nonEmpty", !nonEmpty)}
        >
          <CheckBox value={nonEmpty} style={{ marginRight: 5 }} />
          <Text size={1} color={theme.textPrimary}>
            {t("filter_non_empty_servers")}
          </Text>
        </Pressable>
        <Pressable
          style={{ flexDirection: "row", alignItems: "center", marginTop: 2 }}
          onPress={() => setSearchData("unpassworded", !unpassworded)}
        >
          <CheckBox value={unpassworded} style={{ marginRight: 5 }} />
          <Text size={1} color={theme.textPrimary}>
            {t("filter_unpassworded_servers")}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const MainView = () => {
  const { filterMenu, setSearchData } = useGenericTempState();
  const { sideLists } = useGenericPersistentState();
  const { listType } = useGenericTempState();

  const renderList = () => {
    if (listType === "favorites") return <Favorites />;
    else if (listType === "partners") return <Partners />;
    else if (listType === "internet") return <Internet />;
    else if (listType === "recentlyjoined") return <RecentlyJoined />;
  };

  return (
    <View style={styles.body}>
      <SearchBar onChange={(query) => setSearchData("query", query)} />
      <View style={styles.serverSection}>
        {renderList()}
        {sideLists && <ServerInfo />}
      </View>
      <BottomBar />
      {filterMenu && <FiltersModal />}
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    width: "100%",
  },
  serverSection: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
  },
});

export default MainView;
