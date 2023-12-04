import { Navbar,InterviewCard, useToast  } from "ui"
import { signIn, signOut, useSession } from "auth";
import { useRouter } from "next/router";
import  { LANGUAGES,SUBJECTS } from "../assets/constants"
import { trpc } from "../utils/trpc";

export default function Topics(){

    const {data:session, status} = useSession();
    const router = useRouter();
    const {mutate,isLoading} = trpc.interview.topic.useMutation();
    const { toast } = useToast();

    //Helper function to pass the mutation as a Prop to Children
    function mutateHelper(name:string){
        mutate({name},
            {
                onSuccess(data){
                    console.log(data);
                    toast({
                        title: "Interview Initialised Successfully !!!",
                        description: "You will be redirected to the Interview Page now.",
                    });
                    router.push("/interview");
                },
                onError(error){
                    console.log(error);
                    toast({
                        variant: "destructive",
                        title: "Uh oh! Something went wrong.",
                        description: "There was a problem with your request. Please try again some time later !!",
                    })
                }
            }    
        )
    }

    if(status === "loading"){
        return(
            <div>
                Loading ....
            </div>
        )
    }
    else if(status === "unauthenticated"){
        router.push("/");
    }
    else{
        return(
            <div>

                <Navbar signIn={signIn}
                        signOut={signOut}
                        profilePic={session?.user?.image || ""}
                        status={status}
                />

                <div className="my-4 mx-2 flex flex-col items-center py-3 px-2 ">
                    
                    <h1 className="text-3xl mb-5 font-extrabold ">Pick a Language or a Subject</h1>

                    <div className="p-4">

                        <h2 className="text-xl mb-5 ml-2 md:ml-4 font-semibold text-center md:text-left">Languages</h2>

                        <div className = "grid md:grid-cols-2 lg:grid-cols-3" >

                            {
                                LANGUAGES.map((LANG,ind)=>(
                                    <InterviewCard key={ind} cardTitle = {LANG.name} imgSrc={LANG.src} onClick={mutateHelper}  />
                                ))
                            }

                        </div>

                    </div>

                    <div className="p-4 mt-2">

                        <h2 className="text-xl mb-5 ml-2 md:ml-4 font-semibold text-center md:text-left">Subjects</h2>

                        <div className = "grid md:grid-cols-2 lg:grid-cols-3" >

                            {
                                SUBJECTS.map((SUBJECT,ind)=>(
                                    <InterviewCard key={ind} cardTitle = {SUBJECT.name} imgSrc={SUBJECT.src} onClick={mutateHelper} />
                                ))
                            }

                        </div>

                    </div>

                    

                </div>
                
            </div>
        )
    }
}