package org.fhi360.lamis.modules.clinic.service;

import org.fhi360.lamis.modules.patient.service.providers.PatientObservationViewProvider;
import org.lamisplus.modules.lamis.legacy.domain.entities.Patient;
import org.springframework.stereotype.Service;

@Service
public class StiObservationProvider implements PatientObservationViewProvider {
    @Override
    public boolean applicableTo(Patient patient) {
        return true;
    }

    @Override
    public String getName() {
        return "Start STI Screening";
    }

    @Override
    public String getPath() {
        return "sti-screening";
    }
}
