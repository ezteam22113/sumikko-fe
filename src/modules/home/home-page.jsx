import React from "react";
import { DefaultLayout } from "../../components/default-layout";
import { Card, Container, Image, SimpleGrid, Space, Text } from "@mantine/core";

export default function HomePage({ type = "user" }) {
  const contents = React.useMemo(
    () => [
      {
        title: "Our Experience",
        url: "/about-us.svg",
        description:
          "Sumikko adalah butik mewah yang menawarkan koleksi eksklusif tas Gucci, barang-barang dari Hermes, dan produk-produk mewah lainnya di Indonesia. Dengan reputasi sebagai destinasi belanja yang menonjol, Sumikko menghadirkan pengalaman berbelanja yang istimewa bagi para pecinta fashion dan keanggunan.",
      },
      {
        title: "Our Collection",
        url: "/collection.svg",
        description:
          "Sumikko membanggakan diri sebagai tuan rumah kolaborasi eksklusif dengan merek-merek ternama di Indonesia. Setiap kolaborasi menciptakan pengalaman belanja yang mengagumkan, menggabungkan keunggulan Sumikko dengan keunikan dan estetika merek mitra. Dengan setiap kolaborasi, Sumikko membawa nuansa baru dan sentuhan inovatif ke dalam dunia mode dan gaya di Indonesia.",
      },
      {
        title: "Our Brand",
        url: "/brand.svg",
        description:
          "Nikmati pilihan tas tangan eksklusif yang mencerminkan puncak kemewahan, setiap produk mencerminkan esensi kerjasama yang mendalam. Kolaborasi Sumikko dengan merek-merek mewah ternama memberikan perpaduan unik antara kemewahan dan inovasi, memberikan penggemar fashion Indonesia kesempatan untuk merangkul puncak opulensi.",
      },
    ],
    []
  );

  const isUser = type === "user";

  return (
    <DefaultLayout type={type}>
      {isUser ? (
        <>
          <Container
            p={0}
            fluid
            h="500"
            miw="100vw"
            bg="transparent"
            pos="absolute"
            style={{ zIndex: 1 }}
            left={0}
            right={0}
          >
            <video
              autoPlay
              loop
              muted
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            >
              <source src="/helo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Container>
          <Space h={520} />
          <div
            style={{
              position: "relative",
              zIndex: 1,
            }}
          >
            <Text ta="center" c="white" fz={36} fw={700}>
              Sumikko - Luxury Bag Store
            </Text>
            <Text ta="center" c="white">
              Sumikko adalah butik mewah yang menawarkan koleksi eksklusif dan
              produk-produk mewah lainnya di Indonesia
            </Text>
            <Space h={36} />

            <SimpleGrid cols={3} spacing="xl">
              {contents.map((content) => (
                <Card
                  key={content.title}
                  withBorder
                  shadow="xs"
                  radius="md"
                  bg="transparent"
                >
                  <Image h={300} src={content.url} />
                  <Space h={24} />

                  <Text ta="center" c="white" fz={36} fw={700}>
                    {content.title}
                  </Text>
                  <Space h={12} />
                  <Text fz={16} c="white" ta="center" fw={400}>
                    {content.description}
                  </Text>
                </Card>
              ))}
            </SimpleGrid>

            <Space h={48} />
          </div>
        </>
      ) : (
        <div style={{ minHeight: "95vh" }}>
          <Text c="white" ta="center" fw={700} fz={48}>
            Halaman Admin
          </Text>
          <Text c="white" ta="center" fz={24}>
            Anda harus login agar bisa melihat dan merubah data dari halaman
            admin ini
          </Text>
        </div>
      )}
    </DefaultLayout>
  );
}
