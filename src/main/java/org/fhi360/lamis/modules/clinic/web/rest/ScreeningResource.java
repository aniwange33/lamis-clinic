package org.fhi360.lamis.modules.clinic.web.rest;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.lamis.legacy.domain.repositories.ObservationRepository;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@Slf4j
public class ScreeningResource {
    private final ObservationRepository observationRepository;

    @DeleteMapping("/sti-screening/by-uuid/{id}")
    public void deleteStiByUuid(@PathVariable String id) {
        LOG.debug(" about deleting sti-screening {}", id);
        observationRepository.deleteById(id);
    }

    @DeleteMapping("/gbv-screening/by-uuid/{id}")
    public void deleteGbvByUuid(@PathVariable String id) {
        LOG.debug(" about deleting sti-screening {}", id);
        observationRepository.deleteById(id);
    }
}
