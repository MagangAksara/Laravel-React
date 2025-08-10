import { Helmet } from "react-helmet"
import { Button } from "../../Components/Button"
import { Heading } from "../../Components/Heading"
import { Img } from "../../Components/Img"
import { Text } from "../../Components/Text"
import '../../../css/index.css';
import React from "react"

export default function HeroClip_D() {
    return (
        <>
            <Helmet>
                <title>EasyRide Home - Book Your Comfort Ride Yours</title>
                <meta
                    name="description"
                    content="Find your ride, book it now, and start your journey in comfort today."
                />
            </Helmet>

            {/* hero section */}
            <div className="bg-[url('https://images.unsplash.com/photo-1656685299734-52a0bb4425aa?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0')] h-[720px] w-full bg-cover bg-no-repeat md:h-auto">
                <div className="py-[130px] mb-48 bg-black-900_19 px-12 md:p-5">
                    <div className="mt-9 flex flex-col items-start gap-3.5">
                        <div className="flex flex-col items-center gap-3.5">
                            <Text as="h1-xxl" className="md:text-[48px] text-shadow-ts4 text-[80px] font-bold !text-white">
                                <span className="text-indigo-400">Ride</span>
                                <span className="text-white">&nbsp;your&nbsp;</span>
                                <span className="text-white">journey&nbsp;</span>
                            </Text>
                            <Heading as="h1" className="md-text-[22px] text-shadow-ts5 text-[24px] font-medium">
                                Find your ride, book it now, and start your journey in comfort today.
                            </Heading>
                        </div>
                        <Button 
                            shape="round"
                            color="indigo_400_blue_gray_800"
                            rightIcon={
                                <Img
                                    src="images/img_arrowleft.svg"
                                    alt="Arrow Left"
                                    className="w-[24px] h-[24px] mb-1 mt-1.5 object-contain"
                                />
                            }
                            className="rounded-[14px] min-w-[240px] ml-[210px] gap-2.5 px-3.5 sm:ml-0"
                        >
                            Choose your car{" "}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}