import React, { useEffect, useState, useMemo } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { CardHeader } from '@material-ui/core';
import { PieChart } from 'bizcharts';
import { useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';
import Typography from '@material-ui/core/Typography';
import LayoutBase from '../layout/LayoutBase';
import JobsFitController from './JobsFitController';

const useStyles = createUseStyles({
  indicatorContainer: {
    width: '100%',
  },
});

function buildFitToJobExplainText(fitToJob, formatMessage) {
  if (!fitToJob || fitToJob.length === 0) {
    return formatMessage({ id: 'no fit to job' });
  }

  return fitToJob.map((item) => formatMessage({ id: 'value fit to job' }, { percent: item.percent, count: item.count })).join(', ');
}

function renderJobIndicator(classes, formatMessage, dataToRender, explainText, indicatorName) {
  const parsedDataToRender = dataToRender ? dataToRender.map((item) => ({ label: `${item.percent}%`, value: item.count })) : [];
  return (
    <div className={classes.indicatorContainer} role="img" aria-label={formatMessage({ id: 'fit to job header' }, { explainText })}>
      <Card style={{ width: '100%' }}>
        <CardHeader title={formatMessage({ id: `${indicatorName}.header` })} />
        <CardContent>
          {
            (!dataToRender || dataToRender.length === 0)
            && (
              <Typography variant="body1">
                {explainText}
              </Typography>
            )
          }
          {
            (dataToRender && dataToRender.length > 0)
            && (
              <PieChart
                data={parsedDataToRender}
                title={{
                  visible: false,
                }}
                description={{
                  visible: false,
                }}
                radius={0.8}
                angleField="value"
                colorField="label"
                label={{
                  visible: true,
                  type: 'outer',
                  offset: 20,
                }}
              />
            )
          }
        </CardContent>
      </Card>
    </div>
  );
}

export default function JobsFitView() {
  const { formatMessage } = useIntl();
  const [controller] = useState(() => new JobsFitController());

  const [fitToJob, setFitToJob] = useState([]);
  const [jobsPerSkill, setJobsPerSkill] = useState([]);

  useEffect(() => {
    controller.subscribeFitToJob(setFitToJob);
    controller.subscribeJobsPerSkill(setJobsPerSkill);
    controller.fetchFitToJob();
    controller.fetchJobsPerSkill();
  }, []);

  const fitToJobExplainText = useMemo(
    () => buildFitToJobExplainText(fitToJob, formatMessage),
    [fitToJob],
  );

  const classes = useStyles();

  return (
    <>
      <LayoutBase>
        <Grid
          container
          justify="center"
          spacing={2}
        >
          <Grid container item xs={12} sm={6}>
            {renderJobIndicator(classes, formatMessage, fitToJob, fitToJobExplainText, 'jobsfits')}
          </Grid>
          <Grid container item xs={12} spacing={2}>
            {
              (jobsPerSkill && jobsPerSkill.length > 0) && jobsPerSkill.map((jobPerSkill) => (
                <Grid item xs={4} sm={3} md={2}>
                  <Card style={{ width: '100%' }}>
                    <CardHeader title={jobPerSkill.name} />
                    <CardContent>
                      {jobPerSkill.count}
                      jobs
                    </CardContent>
                  </Card>
                </Grid>
              ))
            }
          </Grid>
        </Grid>
      </LayoutBase>
    </>
  );
}
