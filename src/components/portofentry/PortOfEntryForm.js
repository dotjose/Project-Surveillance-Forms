import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Grid,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  TextField,
  Select,
  MenuItem,
  Button,
  Switch,
  Dialog
} from '@material-ui/core';
import {
  renderField
} from '../form/form-util';
import { isEmpty, cloneDeep } from 'lodash';
import { green, red, grey, teal, amber } from '@material-ui/core/colors';

const HOTEL_KEYS = ['skylight', 'ghion', 'azzeman', 'sapphire', 'other'];

const PortOfEntryForm = ({ onSubmit, lang }) => {

  const [formValues, setFormValues] = useState({});

  const [open, setOpen] = useState(false);

  const handleFieldChange = field => (value) => {
    console.log(field, ': ', value);
    setFormValues({
      ...formValues,
      [field]: value
    })
  }

  const fields = [
    {
      type: 'text',
      label: lang.t('firstName'),
      property: 'firstName',
      focus: true,
      onChange: handleFieldChange('firstName'),
      onValidate: (val) => {
        return !isEmpty(val) && val.length >= 3;
      },
      validationErrorMsg : 'Enter name (min 3 chars)'
    },
    {
      type: 'text',
      label: lang.t('middleName'),
      property: 'middleName',
      onChange: handleFieldChange('middleName')
    },
    {
      type: 'text',
      label: lang.t('lastName'),
      property: 'lastName',
      onChange: handleFieldChange('lastName')
    },
    {
      type: 'text',
      label: lang.t('email'),
      property: 'email',
      onChange: handleFieldChange('email')
    },
    {
      type: 'text',
      label: lang.t('age'),
      property: 'age',
      onChange: handleFieldChange('age')
    },
    {
      type: 'select',
      label: lang.t('sex.label'),
      property: 'sex',
      onChange: handleFieldChange('sex'),
      choices: [
        { label: lang.t('sex.female'), value: 'F' },
        { label: lang.t('sex.male'), value: 'M' }
      ]
    },
    {
      type: 'select',
      label: lang.t('nationality'),
      property: 'nationality',
      onChange: handleFieldChange('nationality'),
      choices: [
        { label: "country 1", value: '1' }, //placeholder
        { label: "country 2", value: '2' }
      ]
    },
    {
      type: 'text',
      label: lang.t('passportNo'),
      property: 'passportNo',
      onChange: handleFieldChange('passportNo')
    },
    {
      type: 'text',
      label: lang.t('phoneNo'),
      property: 'phoneNo',
      onChange: handleFieldChange('phoneNo')
    },
    {
      type: 'select',
      label: lang.t('travelFrom'),
      property: 'travelFrom',
      onChange: handleFieldChange('travelFrom'),
      choices: [
        { label: "country 1", value: '1' }, //placeholder
        { label: "country 2", value: '2' }
      ]
    },
    {
      type: 'select',
      label: lang.t('transitFrom'),
      property: 'transitFrom',
      onChange: handleFieldChange('transitFrom'),
      choices: [
        { label: "country 1", value: '1' }, //placeholder
        { label: "country 2", value: '2' }
      ]
    },
    {
      type: 'select',
      label: lang.t('hotel.label'),
      property: 'hotel',
      onChange: handleFieldChange('hotel'),
      choices: HOTEL_KEYS.map(r => ({ label: lang.t(`hotel.${r}`), value: r })),
    },
    {
      type: 'text',
      label: lang.t('seatNumber'),
      property: 'seatNumber',
      onChange: handleFieldChange('phoseatNumberneNo')
    },
    {
      type: 'text',
      label: lang.t('flightNumber'),
      property: 'flightNumber',
      onChange: handleFieldChange('flightNumber')
    },
    {
      type: 'check',
      label: lang.t('fever'),
      property: 'fever',
      onChange: handleFieldChange('fever')
    },
    {
      type: 'check',
      label: lang.t('cough'),
      property: 'cough',
      onChange: handleFieldChange('cough')
    },
    {
      type: 'check',
      label: lang.t('shortnessOfBreath'),
      property: 'shortnessOfBreath',
      onChange: handleFieldChange('shortnessOfBreath')
    }
  ];

  const renderFormField = (property) => {
    const field = fields.find(f => f.property === property);
    if (!field) {
      return null;
    }
    return renderField(field);
  };

  const renderSectionHeader = (label) => {
    return (
      <Box p={3} my={3} style={{ backgroundColor: green[700] }}>
        <Typography variant="h4">{label}</Typography>
      </Box>
    )
  }

  const renderSubsectionheader = (label) => {
    return (
      <Box mt={3} mb={1}>
        <Typography variant="h5">{label}</Typography>
      </Box>
    )
  }

  const handleSubmit = () => {
    onSubmit(formValues);
  }

  const handleModal = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const isFormValid = () => {
    let isValid = true;
    fields.forEach(f => {
      if (f.onValidate) {
        isValid = isValid && f.onValidate(formValues[f.property]);
      }
    });
    return isValid;
  }

  const renderForm = () => {
    return (
      <form autoComplete="off">
        {renderSectionHeader('Passenger Registration Form')}
        {renderSubsectionheader('Basic Information')}
        <Grid container spacing={4}>
          <Grid item xs={12} md={4} >{renderFormField('firstName')}</Grid>
          <Grid item xs={12} md={4} >{renderFormField('middleName')}</Grid>
          <Grid item xs={12} md={4} >{renderFormField('lastName')}</Grid>
          <Grid item  xs={12} md={4} >{renderFormField('sex')}</Grid>
          <Grid item  xs={12} md={4} >{renderFormField('nationality')}</Grid>
          <Grid item xs={12} md={4} >{renderFormField('passportNo')}</Grid>
          <Grid item  xs={12} md={4} >{renderFormField('phoneNo')}</Grid>
          <Grid item xs={12} md={4} >{renderFormField('age')}</Grid>
          <Grid item xs={12} md={4} >{renderFormField('email')}</Grid>
        </Grid>

        {renderSubsectionheader('Travel Info')}
        <Grid container spacing={4}>
          <Grid item  xs={12} md={3} >{renderFormField('travelFrom')}</Grid>
          <Grid item  xs={12} md={3} >{renderFormField('transitFrom')}</Grid>
          <Grid item  xs={12} md={3} >{renderFormField('flightNumber')}</Grid>
          <Grid item  xs={12} md={3} >{renderFormField('seatNumber')}</Grid>
          <Grid item  xs={12} md={3} >{renderFormField('hotel')}</Grid>
        </Grid>

        {renderSubsectionheader('Symptoms')}
        <Grid container spacing={4}>
          <Grid item  xs={12} md={3} >{renderFormField('fever')}</Grid>
          <Grid item  xs={12} md={3} >{renderFormField('cough')}</Grid>
          <Grid item  xs={12} md={3} >{renderFormField('shortnessOfBreath')}</Grid>
        </Grid>

        <Box mt={4} textAlign="right">
          <Button onClick={handleModal} variant="outlined" size="large">{lang.t('addDependent')}</Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <Paper>
              {/* @todo: Componentize modal */}
              <h1>Dependents</h1>
            </Paper>
          </Dialog>
          <Button onClick={handleSubmit} variant="contained" size="large" disabled={!isFormValid()}>{lang.t('submit')}</Button>
        </Box>
      </form>
    )
  };

  return (
    <Box>
      {renderForm()}
    </Box>
  )
}

export default PortOfEntryForm;
