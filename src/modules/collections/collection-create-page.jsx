import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createCollection,
  getCollection,
  updateCollection,
} from "../../utils/collection-api";
import { notifications } from "@mantine/notifications";
import { getBrands } from "../../utils/brand-api";
import { DefaultLayout } from "../../components/default-layout";
import {
  Button,
  Card,
  Container,
  Flex,
  Image,
  NumberInput,
  Select,
  Space,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { ArrowLeft, FloppyDisk } from "@phosphor-icons/react";

export default function CollectionCreatePage({ type = "create" }) {
  const navigate = useNavigate();
  const query = useParams();
  const back = React.useCallback(() => navigate(-1), [navigate]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [brandOption, setBrandOption] = React.useState([]);

  const [value, setValue] = React.useState({
    description: "",
    image: "",
    name: "",
    price: 0,
    stock: 0,
    brandId: "",
  });

  const isCreate = type === "create";

  const onSubmit = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const result = isCreate
        ? await createCollection(value)
        : await updateCollection(query.id, value);
      notifications.show({
        color: "green",
        message: result.message,
      });
      back();
    } catch (e) {
      notifications.show({
        color: "red",
        title: "error",
        message: e.message,
      });
    } finally {
      setIsLoading(false);
    }
  }, [value, isCreate, query.id, back]);

  React.useEffect(() => {
    async function exec() {
      try {
        setIsLoading(true);
        const { id } = query;
        const collection = await getCollection(id);
        setValue(collection.data);
      } catch (e) {
        notifications.show({
          color: "red",
          title: "error",
          message: e.message,
        });
      } finally {
        setIsLoading(false);
      }
    }
    !isCreate && exec();
  }, [isCreate, query]);

  React.useEffect(() => {
    async function exec() {
      try {
        setIsLoading(true);
        const brand = await getBrands();
        const data = brand.data.map((item) => ({
          label: item.name,
          value: item.id,
        }));
        setBrandOption(data);
      } catch (e) {
        notifications.show({
          color: "red",
          title: "error",
          message: e.message,
        });
      } finally {
        setIsLoading(false);
      }
    }
    exec();
  }, [isCreate]);

  return (
    <>
      <DefaultLayout type={type}>
        <div
          style={{
            minHeight: "100vh",
          }}
        >
          <Space h={36} />
          <Container>
            <Card>
              <Text ta="center" fw={700} fz={24}>
                {isCreate ? "Tambah Collection" : "Edit Collection"}
              </Text>
              <Space h={24} />
              <Flex direction="column" gap={8}>
                <TextInput
                  label="Nama"
                  placeholder="masukkan nama"
                  value={value.name}
                  onChange={(e) => {
                    setValue((prev) => ({ ...prev, name: e.target.value }));
                  }}
                  required
                />
                <TextInput
                  label="Image Url"
                  placeholder="Contoh: https://example.com/hermes.png"
                  value={value.image}
                  onChange={(e) => {
                    setValue((prev) => ({ ...prev, image: e.target.value }));
                  }}
                  required
                />
                <Text>Contoh Gambar</Text>
                <Image w={64} h={64} src={value.image} />
                <NumberInput
                  value={value.stock}
                  onChange={(e) => {
                    // console.log(e);
                    setValue((prev) => ({ ...prev, stock: parseInt(e) }));
                  }}
                  thousandSeparator=","
                  label="Stock"
                  placeholder="masukkan stock"
                  hideControls
                  required
                />
                <NumberInput
                  value={value.price}
                  onChange={(e) => {
                    setValue((prev) => ({ ...prev, price: parseInt(e) }));
                  }}
                  thousandSeparator=","
                  label="Price"
                  placeholder="masukkan harga"
                  hideControls
                  required
                />
                <Select
                  value={value.brandId}
                  label="Brand"
                  placeholder="Pilih Brand"
                  required
                  data={brandOption}
                  searchable
                  onChange={(e) => {
                    setValue((prev) => ({
                      ...prev,
                      brandId: e,
                    }));
                  }}
                />
                <Textarea
                  label="Description"
                  placeholder="masukkan deskripsi"
                  value={value.description}
                  onChange={(e) => {
                    setValue((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }));
                  }}
                  required
                />
              </Flex>
              <Space h={24} />
              <Button
                leftSection={<FloppyDisk size={16} />}
                type="submit"
                loading={isLoading}
                onClick={onSubmit}
              >
                Simpan
              </Button>
              <Space h={8} />
              <Button
                leftSection={<ArrowLeft size={16} />}
                color="red"
                onClick={back}
              >
                Kembali
              </Button>
            </Card>
          </Container>
        </div>
      </DefaultLayout>
    </>
  );
}
