import React from 'react';
import Box from '@mui/material/Box';
import { CircularProgress, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { fetch_git_hub_user_feed } from '../services/GitService';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses }from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

const GitActivityTab = () => {
    const [isLoading, setIsLoading] = React.useState(true);
    const didMount = React.useRef(false)
    const { gitProfile } = useSelector((state) => state.userProfile);
    const [activities, setActivities] = React.useState(null);

    const initPage = async () => {        
        await fetch_git_hub_user_feed(gitProfile.login).then(async response => {
            setIsLoading(false);
            setActivities(response.data);            
        }).catch(error => {
            setIsLoading(false);
            alert("Ooops! Something went wrong while fetching your git hub activity")
        });
    }

    React.useEffect(() => {
        if (didMount.current == false) {
            didMount.current = true
            initPage();
        }
    }, [isLoading]);

    return (
        <Box
            component="div"
        >
            {(isLoading != false) ?
                <>
                    <CircularProgress />                    
                    <Typography variant="body1">Loading ...</Typography>
                </>
                :
                <>
                    <Typography variant="h4" component="h4">Git Activity</Typography>

                    {activities?.length > 0 ?
                        <Timeline
                            sx={{
                                [`& .${timelineItemClasses.root}:before`]: {
                                    flex: 0,
                                    padding: 0,
                                },
                            }}
                        >
                            {activities?.map((activity, index1) => (
                                <>
                                    {activity.type == "PushEvent" ?
                                        <TimelineItem>
                                            <TimelineSeparator>
                                                <TimelineDot />
                                                <TimelineConnector />
                                            </TimelineSeparator>
                                            <TimelineContent>
                                                <Typography variant="h6" component="h6">Pushed to {activity.repo.name}</Typography>
                                                {activity.payload.commits?.map((commit, index2) => (
                                                    <>
                                                        <Typography variant="body2">
                                                            <b><i>{commit.author.name}:</i></b> {commit.message}
                                                        </Typography>
                                                    </>
                                                ))}
                                            </TimelineContent>
                                        </TimelineItem>
                                        :
                                        <></>
                                    }

                                    {activity.type == "PullRequestEvent" ?
                                        <TimelineItem>
                                            <TimelineSeparator>
                                                <TimelineDot />
                                                <TimelineConnector />
                                            </TimelineSeparator>
                                            <TimelineContent>
                                                <Typography variant="h6" component="h6">Closed PR in {activity.repo.name}</Typography>

                                                <Typography variant="body1">
                                                    <b><i>{activity.payload.pull_request.user.login}:</i></b> {activity.payload.pull_request.title}
                                                </Typography>

                                                <Typography variant="body1">
                                                    Merged by {activity.payload.pull_request?.merged_by?.login}
                                                </Typography>

                                                <Typography variant="body1">
                                                    Merged at {activity.payload.pull_request.merged_at}
                                                </Typography>
                                            </TimelineContent>
                                        </TimelineItem>
                                        :
                                        <></>
                                    }

                                    {activity.type == "PullRequestReviewEvent" ?
                                        <TimelineItem>
                                            <TimelineSeparator>
                                                <TimelineDot />
                                                <TimelineConnector />
                                            </TimelineSeparator>
                                            <TimelineContent>
                                                <Typography variant="h6" component="h6">Created PR in {activity.repo.name}</Typography>

                                                <Typography variant="body1">
                                                    {activity.payload.pull_request.title}
                                                </Typography>

                                                <Typography variant="body1">
                                                    Requested by {activity.payload.pull_request.user.login}
                                                </Typography>

                                                <Typography variant="body1">
                                                    Requested at {activity.payload.pull_request.merged_at}
                                                </Typography>
                                            </TimelineContent>
                                        </TimelineItem>
                                        :
                                        <></>
                                    }



                                    {activity.type == "CreateEvent" ?
                                        <TimelineItem>
                                            <TimelineSeparator>
                                                <TimelineDot />
                                                <TimelineConnector />
                                            </TimelineSeparator>
                                            <TimelineContent>
                                                <Typography variant="h6" component="h6">Created a new branch in {activity.repo.name}</Typography>

                                                <Typography variant="body1">
                                                    {activity.payload.ref}
                                                </Typography>
                                            </TimelineContent>
                                        </TimelineItem>
                                        :
                                        <></>
                                    }

                                    {activity.type == "DeleteEvent" ?
                                        <TimelineItem>
                                            <TimelineSeparator>
                                                <TimelineDot />
                                                <TimelineConnector />
                                            </TimelineSeparator>
                                            <TimelineContent>
                                                <Typography variant="h6" component="h6">Deleted a branch from {activity.repo.name}</Typography>

                                                <Typography variant="body1">
                                                    {activity.payload.ref}
                                                </Typography>
                                            </TimelineContent>
                                        </TimelineItem>
                                        :
                                        <></>
                                    }

                                    {activity.type == "ForkEvent" ?
                                        <TimelineItem>
                                            <TimelineSeparator>
                                                <TimelineDot />
                                                <TimelineConnector />
                                            </TimelineSeparator>
                                            <TimelineContent>
                                                <Typography variant="h6" component="h6">Forked a project {activity.repo.name}</Typography>
                                            </TimelineContent>
                                        </TimelineItem>
                                        :
                                        <></>
                                    }

                                </>
                            ))}
                        </Timeline>
                        :
                        <>
                            <Typography variant="body2">No Activity recorded</Typography>
                        </>
                    }
                </>
            }
        </Box>
    );
};

export default GitActivityTab;
