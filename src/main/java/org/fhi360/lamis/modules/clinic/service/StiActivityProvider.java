package org.fhi360.lamis.modules.clinic.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.fhi360.lamis.modules.patient.service.providers.PatientActivityProvider;
import org.fhi360.lamis.modules.patient.service.providers.vm.PatientActivity;
import org.lamisplus.modules.lamis.legacy.domain.entities.Patient;
import org.lamisplus.modules.lamis.legacy.domain.repositories.ObservationRepository;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Slf4j
public class StiActivityProvider implements PatientActivityProvider {
    private final static String TYPE = "STI_SCREENING";
    private final ObservationRepository observationRepository;

    @Override
    public List<PatientActivity> getActivitiesFor(Patient patient) {
        List<PatientActivity> activities = new ArrayList<>();
        observationRepository.findByPatientAndType(patient, TYPE)
                .stream()
                .findFirst()
                .ifPresent(
                observation -> {
                    LOG.info("STI: Observation{}", observation);
                    PatientActivity patientActivity = getPatientActivity(observation);
                    activities.add(patientActivity);

                }
        );
        return activities;
    }
    private PatientActivity getPatientActivity(
            org.lamisplus.modules.lamis.legacy.domain.entities.Observation observation) {
        return new PatientActivity(
                Objects.requireNonNull(observation.getId()),
                "STI Screening",
                 observation.getDate(),
                "", "sti-screening");
    }
}
